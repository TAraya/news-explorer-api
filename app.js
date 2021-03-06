import express from 'express';
import parser from 'body-parser';
import celebrate from 'celebrate';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

import articlesRouter from './routes/articles';
import signRouter from './routes/sign';
import usersRouter from './routes/users';

import auth from './middlewares/auth';
import errorHandler from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logging';
import rateLimiter from './middlewares/rate-limiter';

import NotFoundError from './errors/not-found-error';

import messages from './utils/messages';
import config from './utils/config';

const app = express();

mongoose.connect(config.CONN_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(helmet());
app.use(parser.json());

app.use(requestLogger);
app.use(errorLogger);

app.use(rateLimiter);

// no auth
app.use(signRouter);

app.use(auth);
app.use(articlesRouter);
app.use(usersRouter);

// eslint-disable-next-line no-unused-vars
app.use('/', (req, res) => {
  throw new NotFoundError(messages.pathNotFound);
});

app.use(celebrate.errors());
app.use(errorHandler);

app.listen(config.PORT, () => {});
