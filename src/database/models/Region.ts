
import {  model, Schema } from 'mongoose';
import { IRegion } from '../interfaces/Region';
const regionSchema = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      default:'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    locationName:{type:String, required:false},
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
  }
    );

    export default model<IRegion>('Region', regionSchema);