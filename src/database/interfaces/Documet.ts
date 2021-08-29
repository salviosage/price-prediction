import { Document } from 'mongoose';

export interface IDocument extends Document {
    title:string
    documentId:string,
    type:string,
    url:string,
    verified:boolean,
    createdAt: Date;
    updatedAt: Date;
}