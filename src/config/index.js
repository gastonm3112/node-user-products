const dotenv = require('dotenv');
const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  port: process.env.PORT,
  api: {
    prefix: '/api/v1'
  },
  databaseURL: process.env.DATABASE_URL,
  auth: {
    secret: process.env.AUTH_SECRET,
    expires: process.env.AUTH_EXP
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_ID
  }
}