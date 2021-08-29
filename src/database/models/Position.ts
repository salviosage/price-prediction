import {  model, Schema } from 'mongoose';
import { IPosition } from '../interfaces/Position';

const PositionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { 
    type: Schema.Types.ObjectId,
        ref: 'Department',
     required: true,
     unique:true },
  assignedEmployee: [{type: Schema.Types.ObjectId,ref: 'User',required: false,unique:true}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}).pre('save', async function(this: IPosition){
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

export default model<IPosition>('Position', PositionSchema);