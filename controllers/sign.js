import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../models/user';

import ConflictError from '../errors/conflict-error';
import UnauthorizedError from '../errors/unauthorized-error';
import ValidationError from '../errors/validation-error';

import { JWT_SECRET } from '../utils/defaults';

const { SECRET = JWT_SECRET } = process.env;

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Неправильные почта или пароль');
    }

    const matched = await compare(password, user.password);
    if (!matched) {
      throw new Error('Неправильные почта или пароль');
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

    const passwordHash = await hash(password, 10);
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
      next(new ValidationError('Переданы некорректные данные'));
      return;
    }

    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError('Пользователь с данным email уже зарегистрирован'));
      return;
    }

    next(err);
  }
}

export { login, createUser };