import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import { getArticles, createArticle, deleteArticle } from '../controllers/articles';

const indexRouter = Router();

indexRouter.get(
  '/articles',
  getArticles,
);

indexRouter.post(
  '/articles',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.date().required(),
      source: Joi.string().required(),
      link: Joi.string().required().uri(),
      image: Joi.string().required().uri(),
    }),
  }),
  createArticle,
);

indexRouter.delete(
  '/articles/:articleId',
  celebrate({
    headers: Joi.object().keys({
      articleId: Joi.string().hex().length(24),
    }).unknown(true),
  }),
  deleteArticle,
);

export default indexRouter;
