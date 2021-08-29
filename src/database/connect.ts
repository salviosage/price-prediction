import mongoose from 'mongoose';
import { environment } from './environment';

export const connect = async () => {
  try {
    await mongoose.connect(`${environment.mongoURI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log('mongo database error', error);
  }
};

export const testConnect = async () => {
  await mongoose.connect(`${environment.mongoTESTURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
};
