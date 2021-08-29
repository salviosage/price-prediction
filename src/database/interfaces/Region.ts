import { Document } from 'mongoose';
import {IUser} from './User'

  export interface IRegion extends Document {
    type: string;
    coordinates: [number];
    locationName: string;
  }