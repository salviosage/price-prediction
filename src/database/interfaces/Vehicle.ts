import { Document } from 'mongoose';
import { IContact } from './Common';


export interface IVehicle extends Document {
    ownerContact: {type:IContact};
    vehicleType: string,
    plateNumber: string,
    insuranceExpiresOn: Date,
    insurance: string,
    paymentMethod: string,
    accountNumber: string,
    verified:boolean
    createdAt: Date;
    updatedAt: Date;
}