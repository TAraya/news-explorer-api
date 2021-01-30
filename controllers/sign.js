import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import userModel from '../models/user';

import ConflictError from '../errors/conflict-error';
import UnauthorizedError from '../errors/unauthorized-error';
import ValidationError from '../errors/validation-error';

import messages from '../utils/messages';
import { JWT_SECRET } from '../utils/defaults';

dotenv.config();
const { SECRET = JWT_SECRET } = process.env;

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new Error(messages.loginIncorrect);
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new Error(messages.loginIncorrect);
    }

    const token = jwt.sign(
      { _id: user._id },
      SECRET,
      { expiresIn: '7d' },
    );

    res.send({ token });
  } catch (err) {
    const authError = new UnauthorizedError(err.message);
    next(authError);
  }
}

async function createUser(req, res, next) {
  try {
    const { email, password, name } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email,
      password: passwordHash,
      name,
    });

    res.send({
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError(messages.badRequest));
      return;
    }

    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError(messages.loginAlreadyExists));
      return;
    }

    next(err);
  }
}

export { login, createUser };
