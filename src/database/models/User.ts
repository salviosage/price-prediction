import {  model, Schema } from 'mongoose';
import { IUser} from '../interfaces/User';
import bcrypt from 'bcryptjs'
import {userTypeTypes,accountStatusTypes} from '../../constants'
import {documentSchema} from './Common'


const userSchema = new Schema({
  first_name: { type: String, required: true },
  other_names: { type: String, required: true },
  email: { type: String, required: true },
  user_type: { type: String, required: true,enum: userTypeTypes, default: userTypeTypes.NOT_ASSIGNED },
  password: { type: String, required: true },
  avatar: { type: String },
  account_otp: { type: String },
  reset_password_otp:{type:String},
  mfa_otp: { type: String },
  mfa_otp_expiry:{ type: Date, default: new Date( Date.now() + 60000*10)},
  documents:{type: [documentSchema], required: false},
  email_verified:{type:Boolean,default:false},
  phone_number: { type: String, required: true },
  phone_number_verified:{type:Boolean,default:false},
  account_status: { type: String, required: true,enum: accountStatusTypes, default: accountStatusTypes.PENDING },
  otp_expirity:{ type: Date, default: new Date( Date.now() + 60000*10)},
  reset_password_otp_expirity: {type: Date },
  account_otp_expirity: {type: Date},
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
}).pre('save', async function(this: IUser){
  return new Promise((resolve, reject) => {
      if (this.isNew || this.isModified('password')) {
                bcrypt.hash(this.password,  10, (err, hash) => {
                  if (err) return reject(err)
                  this.password = hash 
                  this.updatedAt= new Date 
                  resolve();
                }) 
              }
              else if  (this.isModified()) {
                  this.updatedAt= new Date 
                  resolve();
                }
         else {
          resolve();
      }
  });
});

export default  model<IUser> ('User', userSchema);

