import { model, Schema } from 'mongoose';
import { IVehicle } from '../interfaces/Vehicle';
import {ContactSchema} from './Common'


const VehicleSchema = new Schema({
  ownerContact: { type: ContactSchema, required: false },
  vehicleType: { type: String, required: true },
  plateNumber: { type: String, required: true, unique: true },
  insuranceExpiresOn: { type: Date, required: true },
  insurance: { type: String, required: true },
  paymentMethod: { type: String, required: false },
  verified:{type:Boolean, default:false },
  accountNumber: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}).pre('save', async function(this: IVehicle){
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

export default model<IVehicle> ('Vehicle', VehicleSchema);
