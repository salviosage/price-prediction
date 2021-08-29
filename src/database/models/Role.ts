import {  model, Schema } from 'mongoose';
import { IRole } from '../interfaces/Role';


const RoleSchema = new Schema({
  title: { type: String,unique:true },
  privilegeLevel: { type: Number },
  description: { type: String },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
}).pre('save', async function(this: IRole){
  return new Promise((resolve, reject) => {
     
              if  (this.isModified()) {
                this.updatedAt= new Date 
                resolve();
              }
             
         else {
          resolve();
      }
  });
})
.pre('updateOne', async function(this: IRole){
  return new Promise((resolve, reject) => {
     if  (this.isModified()) {
                  this.updatedAt= new Date 
                  resolve();
                }
         else {
          resolve();
      }
  });
})
;
;


 export default  model<IRole>('Role', RoleSchema);
