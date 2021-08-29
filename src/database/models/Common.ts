
import {  Schema } from 'mongoose';
export const regionSchema = new Schema({
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
  LocationName:{type:String, required:false}
},{ _id : false }
  );
  

  export const  documentSchema = new Schema(
    {documentId: { type: String, required: true },
        type: { type: String, required: true },
        url: { type: String, required: true},
        verified: { type: Boolean, default: false}},{ _id : false }
  );

  export const  ContactSchema = new Schema(
    { phoneNumber:{ type: String, required: true},
    names:{ type: String, required: true},
    description:{ type: String, required: false},
    email: {type:String,required:false }},{ _id : false }
  );
  export const  TruckSchema = new Schema(
    { type:{ type: String, required: true},
    count:{ type: Number, required: true}},{ _id : false }
  );
  export const  ShipmentDriverSchema = new Schema(
    {  driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      unique:true,
  },
    price:{ type: Number, required: true}},{ _id : false }
  );