import { Document } from 'mongoose';
import {IDoc} from './Common'
import {userTypeTypes,accountStatusTypes} from '../../constants'
export interface IUser extends Document {

  first_name: string;
  other_names: string;
  avatar?: string;
  user_type: string;
  email:string;
  password: string;
  phone_number: string;
  account_otp: string,
  mfa_otp: string,
  mfa_otp_expiry:Date,
  reset_password_otp:string
  temporal_otp?:string;
  documents: [
    IDoc
  ];
  email_verified:boolean,
  phone_number_verified:boolean,
  account_status: string,
  verified:Boolean;
  reset_password_otp_expirity:Date;
  account_otp_expirity:Date;
  createdAt: Date;
  updatedAt: Date;
 
}

export interface IUserType extends Document {
  userType: [string];
}
