import { model, Schema } from 'mongoose';
import { IEmployee } from '../interfaces/Employee';
import {employeeStatusType,tshirtType} from '../../constants'

import { documentSchema } from './Common'


const employeeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
    },
    position: { type: String },
    passport: { type: String,required: false },
    national_d: { type: String,required: false },
    t_shirt_size: { type: String, enum: tshirtType },
    start_date: { type: Date },
    end_date: { type: Date },
    status: { type: String, enum: employeeStatusType, default: employeeStatusType.ACTIVE },
    documents: { type: [documentSchema], required: false },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Region',
    },
    verified: { type: Boolean, default: false },
    work_phone_number: { type: String, required: true },
    work_email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});


export default model<IEmployee>('Employee', employeeSchema);