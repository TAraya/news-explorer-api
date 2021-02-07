import celebrate from 'celebrate';
import express from 'express';

import { login, createUser } from '../controllers/sign';

import { notWhitespacesValidator } from '../utils/validation';

const signRouter = express.Router();

signRouter.post(
  '/signin',
  celebrate.celebrate({
    body: celebrate.Joi.object().keys({
      email: celebrate.Joi.string().required().email()
        .custom(notWhitespacesValidator),
      password: celebrate.Joi.string().required().min(6)
        .custom(notWhitespacesValidator),
    }),
  }),
  login,
);

signRouter.post(
  '/signup',
  celebrate.celebrate({
    body: celebrate.Joi.object().keys({
      email: celebrate.Joi.string().required().email()
        .custom(notWhitespacesValidator),
      password: celebrate.Joi.string().required().min(6)
        .custom(notWhitespacesValidator),
      name: celebrate.Joi.string().required().min(2).max(30)
        .custom(notWhitespacesValidator),
    }),
  }),
  createUser,
);

export default signRouter;
