import rateLimit from 'express-rate-limit';

import config from '../utils/config';

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: config.RATE_HOUR_LIMIT,
});

export default limiter;
