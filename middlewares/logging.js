import winston from 'winston';
import logging from 'express-winston';

export const requestLogger = logging.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

export const errorLogger = logging.logger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});
