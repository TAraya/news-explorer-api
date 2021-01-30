import celebrate from 'celebrate';
import express from 'express';

import { getArticles, createArticle, deleteArticle } from '../controllers/articles';

const indexRouter = express.Router();

indexRouter.get(
  '/articles',
  getArticles,
);

indexRouter.post(
  '/articles',
  celebrate.celebrate({
    body: celebrate.Joi.object().keys({
      keyword: celebrate.Joi.string().required(),
      title: celebrate.Joi.string().required(),
      text: celebrate.Joi.string().required(),
      date: celebrate.Joi.date().required(),
      source: celebrate.Joi.string().required(),
      link: celebrate.Joi.string().required().uri(),
      image: celebrate.Joi.string().required().uri(),
    }),
  }),
  createArticle,
);

indexRouter.delete(
  '/articles/:articleId',
  celebrate.celebrate({
    headers: celebrate.Joi.object().keys({
      articleId: celebrate.Joi.string().hex().length(24),
    }).unknown(true),
  }),
  deleteArticle,
);

export default indexRouter;
