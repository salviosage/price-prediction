import mongoose from 'mongoose';
import { environment } from './environment';
import RealtimeDriverModel from '../database/models/RealTimeDrivers';
import { PubSub} from 'graphql-yoga';
const pubsub = new PubSub()

export const connect = async () => {
  try {
    await  mongoose.connect(`${environment.mongoURI}`, {
      useNewUrlParser: true,
      ssl:false,

      useUnifiedTopology: true,
    });
  //   const db = mongoose.connection
  //   const taskCollection = db.collection('realtimedriver',{});
  //     const changeStream = taskCollection.watch();
    
  //     // const changeStream = RealtimeDriverModel.watch();

  //     changeStream.on('change', async (change) => {
  //       const realtimeData = await RealtimeDriverModel.find()
        
  //       const count = await RealtimeDriverModel.countDocuments({
  
  //       });
  // console.log('yoo')
  //       await pubsub.publish('REAL_TIME_DRIVERS_CHANGE', { drivers: realtimeData, count }
  //       );
  //     });
    
    console.log('connected to the database')
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