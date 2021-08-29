import {  model, Schema } from 'mongoose';
import { IDepartment } from '../interfaces/Department';

const DepartmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedEmployees: [{type: Schema.Types.ObjectId,ref: 'User',required: false,unique:true}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}).pre('save', async function(this: IDepartment){
  return new Promise((resolve, reject) => {
     if  (this.isModified()) {
                  this.updatedAt= new Date 
                  resolve();
                }
         else {
          resolve();
      }
  });
});

export default model<IDepartment>('Department', DepartmentSchema);