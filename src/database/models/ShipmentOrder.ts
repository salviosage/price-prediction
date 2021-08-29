import { model, Schema } from 'mongoose';
import { IShipmentOrder } from '../interfaces/ShipmentOrder';
import { ContactSchema, TruckSchema, regionSchema, ShipmentDriverSchema } from './Common'
import Region from './Region';


const ShipmentOrderSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Region',
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'Region',
  },
  status: { type: String, required: true, default: 'Initiated' },
  contact: { type: ContactSchema, required: true },
  destinationContact: { type: ContactSchema, required: false },
  goodsDetails: { type: String, required: true },
  trucksRequested: [{ type: TruckSchema, required: true }],
  assignedDrivers: [{ type: ShipmentDriverSchema, required: false }],
  timeToDeliver: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}).pre('save', async function (this: IShipmentOrder) {
  return new Promise((resolve, reject) => {
    if (this.isModified()) {
      this.updatedAt = new Date
      resolve();
    }
    else {
      resolve();
    }
  });
});


export default model<IShipmentOrder>('ShipmentOrder', ShipmentOrderSchema);