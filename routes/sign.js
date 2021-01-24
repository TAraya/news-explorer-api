import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import { login, createUser } from '../controllers/sign';

import { notWhitespacesValidator } from '../utils/validation';

const signRouter = Router();

signRouter.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email()
        .custom(notWhitespacesValidator),
      password: Joi.string().required().min(6)
        .custom(notWhitespacesValidator),
    }),
  }),
  login,
);

signRouter.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email()
        .custom(notWhitespacesValidator),
      password: Joi.string().required().min(6)
        .custom(notWhitespacesValidator),
      name: Joi.string().required().min(2).max(30)
        .custom(notWhitespacesValidator),
    }),
  }),
  createUser,
);

export default signRouter;
