import { Document } from 'mongoose';
import { IRegion } from './Region';
import {IDoc} from './Common'
import { IDepartment } from './Department';
import {IUser} from './User'
export interface IEmployee extends Document {
  user:IUser
  work_phone_number: string;
  work_email: string;
  t_shirt_size:string;
  position:string;
  start_date : Date ;
  end_date:string ;
  passport:string,
  national_id: string,
  documents: [
    IDoc
  ];
  verified:Boolean;
  createdAt: Date;
  updatedAt: Date;
  department: IDepartment,
  status: string,
  address:IRegion,


}