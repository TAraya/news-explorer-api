import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import { DEFAULT_RATE_HOUR_LIMIT } from '../utils/defaults';

dotenv.config();
const { RATE_HOUR_LIMIT = DEFAULT_RATE_HOUR_LIMIT } = process.env;

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: RATE_HOUR_LIMIT,
});

export default limiter;
