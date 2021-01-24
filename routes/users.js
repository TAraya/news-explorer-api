import { Router } from 'express';

import { getCurrentUser } from '../controllers/users';

const usersRouter = Router();

usersRouter.get(
  '/users/me',
  getCurrentUser,
);

export default usersRouter;
