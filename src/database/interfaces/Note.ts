import { Document } from 'mongoose';

export interface INote extends Document {
    title:String
    type: String,
    description:String,
    coverImage:String,
    createdAt: Date;
    updatedAt: Date;
}
