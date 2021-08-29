import { Document } from 'mongoose';
import { IRegion } from './Region';
import {IContact, IDoc} from './Common'
import {IUser} from './User'
import { IShipmentOrder } from './ShipmentOrder'
export interface IClient extends Document {
  user:IUser
  shipment_orders: [
    IShipmentOrder
  ];
  documents: [
    IDoc
  ];
  contact_persons:[IContact]
  verified:Boolean;
  createdAt: Date;
  updatedAt: Date;
  address:IRegion,
}
