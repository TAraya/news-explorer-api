import dotenv from 'dotenv';

dotenv.config();
const {
  PORT = 3001,
  CONN_STRING = 'mongodb://localhost:27017/newsexplorerdb',
  RATE_HOUR_LIMIT = 1000,
  SECRET = 'dev_secret',
} = process.env;

export default {
  PORT,
  CONN_STRING,
  RATE_HOUR_LIMIT,
  SECRET,
};
