import { ObjectType, Field, ArgsType, InputType,ID } from 'type-graphql';
import {ORegion} from '../common'
import Driver from '../drivers'
@ObjectType()
export default class RealTimeDrivers {

  @Field(type => ID)
  id: string;
  @Field(()=>Driver,{nullable:true})
  driver:Driver
  @Field()
  isOnline:Boolean;
  @Field(()=>ORegion,{nullable:true})
  liveLocation!:ORegion;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

@ObjectType()
export class RealTimeDriversPayload {
  @Field(()=>RealTimeDrivers)
  drivers?: [RealTimeDrivers];
  @Field()
  count?: number;
}