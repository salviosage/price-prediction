import { boolean } from '@hapi/joi';
import {  model, Schema } from 'mongoose';
import { IRealTimeDrivers } from '../interfaces/RealTimeDrivers';
import {regionSchema,documentSchema} from './Common'



const RealTimeDriversSchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
    unique:true,
},
isOnline:{type:Boolean, default:true},
 liveLocation: {type:regionSchema,required:true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}).pre('save', async function(this: IRealTimeDrivers){
  return new Promise((resolve, reject) => {
     if  (this.isModified()) {
                  this.updatedAt= new Date 
                  resolve();
                }
         else {
          resolve();
      }
  });
});;


 export default model<IRealTimeDrivers>('RealTimeDrivers', RealTimeDriversSchema);
