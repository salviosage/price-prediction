import * as dotenv from 'dotenv';

dotenv.config();
const { mongoURI, mongoTESTURI, NODE_ENV, IRONJI_SECRET_KEY } = process.env;
export const environment = {
  mongoURI,
  mongoTESTURI,
  NODE_ENV,
  IRONJI_SECRET_KEY
};
