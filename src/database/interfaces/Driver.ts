import { Document } from 'mongoose';
import { IDoc } from './Common';
import { IUser } from './User';

export interface IDriver extends Document {
  passport:string,
  user:IUser
  documents: [
    IDoc
  ];
  national_id: string,
  driving_permit: string;
  truck_plate_number: string;
  truck_insurance: string;
  carte_jaune: string;
  work_phone_number: string;
  verified:Boolean;
  createdAt: Date;
  updatedAt: Date;
}



