import mongoose from 'mongoose';

import { isEmail } from '../utils/validation';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator(value) {
        return isEmail(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model('user', userSchema);
