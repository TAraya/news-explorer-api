import articleModel from '../models/article';

import ForbiddenError from '../errors/forbidden-error';
import NotFoundError from '../errors/not-found-error';
import ValidationError from '../errors/validation-error';

import messages from '../utils/messages';

async function getArticles(req, res, next) {
  try {
    const articles = await articleModel.find({ owner: req.user });
    res.send({ data: articles });
  } catch (err) {
    next(err);
  }
}

async function createArticle(req, res, next) {
  try {
    const article = await articleModel.create({
      keyword: req.body.keyword,
      title: req.body.title,
      text: req.body.text,
      date: req.body.date,
      source: req.body.source,
      link: req.body.link,
      image: req.body.image,
      owner: req.user,
    });
    res.send({ data: article });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError(messages.badRequest));
      return;
    }

    next(err);
  }
}

async function deleteArticle(req, res, next) {
  try {
    const article = await articleModel.findById(req.params.articleId).select('+owner');

    if (!article) {
      throw new NotFoundError(messages.articleNotFound);
    }

    if (article.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError(messages.articleWrongOwner);
    }

    await articleModel.deleteOne({ _id: req.params.articleId });
    res.sendStatus(200);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError(messages.incorrectId));
      return;
    }

    next(err);
  }
}

export { getArticles, createArticle, deleteArticle };
