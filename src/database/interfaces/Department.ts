import { Document } from 'mongoose';
import {IUser} from './User'

export interface IDepartment extends Document {
    title:String
    description:String,
    createdAt: Date;
    updatedAt: Date;
}