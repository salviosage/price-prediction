
import { Document } from 'mongoose';
import {IRegion,IDoc} from './Common'
import {IDriver} from './Driver'


export interface IRealTimeDrivers extends Document
{
  driver:string
  liveLocation: IRegion,
  isOnline:Boolean,
  createdAt: Date,
  updatedAt:  Date,
}