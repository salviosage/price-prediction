import { Document } from 'mongoose';
import {IDriver} from './Driver'
import {INote} from './Note'
import {IShipmentOrder} from './ShipmentOrder'

export interface IShipment extends Document {
    title:String
    assignedDrivers: [IDriver],
    notes:[INote]
    status:String,
    shipmentOrder:IShipmentOrder,
    createdAt: Date;
    updatedAt: Date;
}



