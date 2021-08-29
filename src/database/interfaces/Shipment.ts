import { Document } from 'mongoose';

export interface IShipment extends Document {
  from: { region: String , long: String , lat:String  };
  to: { region:String , long: String , lat:  String  };
  packageDetails: string;
  phoneNumber: number;
  clientName: string;
  weight: number;
  timeToDeliver: Date;
  
}