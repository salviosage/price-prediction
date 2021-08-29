import { Document } from 'mongoose';

export interface IRole extends Document {
  title: string;
  privilegeLevel: Number;
  description: string,
  createdAt: Date;
  updatedAt: Date;
}
