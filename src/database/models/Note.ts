import {  model, Schema } from 'mongoose';
import { INote } from '../interfaces/Note';

const NoteSchema = new Schema({

  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}).pre('save', async function(this: INote){
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

export default  model<INote> ('Note', NoteSchema);
