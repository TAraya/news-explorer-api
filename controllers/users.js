import model from '../models/user';

import NotFoundError from '../errors/not-found-error';

import messages from '../utils/messages';

async function getCurrentUser(req, res, next) {
  try {
    const user = await model.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(messages.userNotFound);
    }

    res.send({
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    next(err);
  }
}

// eslint-disable-next-line import/prefer-default-export
export { getCurrentUser };
