import {  model, Schema } from 'mongoose';
import { IDriver } from '../interfaces/Driver';
import { documentSchema } from './Common';



const DriverSchema = new Schema({
  passport: { type: String,required: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
},
documents: { type: [documentSchema], required: false },
  national_id: { type: String,required: false },
  verified:{type:Boolean,default:false},
  work_phone_number: { type: String, required: true, unique: true },
  driving_permit:{ type:String},
  truck_plate_number:{type: String},
  truck_insurance: {type:String},
  carte_jaune: {type:String},
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
})
.pre('updateOne', async function(this: IDriver){
  return new Promise((resolve, reject) => {
     if  (this.isModified()) {
                  this.updatedAt= new Date 
                  resolve();
                }
         else {
          resolve();
      }
  });
})
;
;


 export default  model<IDriver>('Driver', DriverSchema);
