import jwt from 'jsonwebtoken';

import messages from '../utils/messages';
import config from '../utils/config';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: messages.authRequired });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, config.SECRET);
  } catch (err) {
    return res.status(401).send({ message: messages.authRequired });
  }

  req.user = payload;

  return next();
};
