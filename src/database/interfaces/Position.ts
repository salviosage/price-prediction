import { Document } from 'mongoose';
import { IDepartment } from './Department';
import {IUser} from './User'

export interface IPosition extends Document {
    title:String
    assignedEmployees: [string],
    department:String,
    description:string,
    createdAt: Date;
    updatedAt: Date;
}