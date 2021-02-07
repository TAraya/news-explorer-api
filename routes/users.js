import express from 'express';

import { getCurrentUser } from '../controllers/users';

const usersRouter = express.Router();

usersRouter.get(
  '/users/me',
  getCurrentUser,
);

export default usersRouter;
