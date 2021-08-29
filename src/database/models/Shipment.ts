import {  model, Schema } from 'mongoose';
import { IShipment } from '../interfaces/Shipment';

const ShipmentSchema = new Schema({

  title: { type: String, required: true },
  status: { type: String, required: true },
  shipmentOrder: { 
    type: Schema.Types.ObjectId,
        ref: 'ShipmentOrder',
    //  required: true,
     unique:true },
  assignedDrivers: [{type: Schema.Types.ObjectId,ref: 'Driver',required: false,unique:true}],
  notes: [{type: Schema.Types.ObjectId,ref: 'Note',required: false,}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}).pre('save', async function(this: IShipment){
  return new Promise((resolve, reject) => {
     if  (this.isModified()) {
                  this.updatedAt= new Date 
                  resolve();
                }
         else {
          resolve();
      }
  });
});

export default model<IShipment>('Shipment', ShipmentSchema);
