
import dotenv from 'dotenv';

dotenv.config();

const required = [
  'MONGODB_URI',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`${key} is required`);
  }
}

export const env = {
  port: Number(process.env.PORT || 5000),

  mongoUri: process.env.MONGODB_URI,

  accessSecret: process.env.JWT_ACCESS_SECRET,
  accessExpiresIn:
    process.env.JWT_ACCESS_EXPIRES_IN || '15m',

  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpiresIn:
    process.env.JWT_REFRESH_EXPIRES_IN || '7d',

  clientUrl:
    process.env.CLIENT_URL || 'http://localhost:5173',

  apiBaseUrl:
    process.env.API_BASE_URL || 'http://localhost:3000',

  awsRegion:
    process.env.AWS_REGION || 'eu-north-1',

  sesFromEmail:
    process.env.SES_FROM_EMAIL,

  nodeEnv:
    process.env.NODE_ENV || 'development',
};