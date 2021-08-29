import { Document } from 'mongoose';
import {IRegion,IContact,ISDrivers, ITrucks} from './Common'

export interface IShipmentOrder extends Document {
    from:IRegion,
    to:IRegion,
    contact: IContact,
    goodsDetails:String,
    destinationContact:IContact,
    trucksRequested:ITrucks,
    assignedDrivers:ISDrivers,
    timeToDeliver: Date,
    createdAt: Date;
    updatedAt: Date;
}




