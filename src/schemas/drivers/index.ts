import { ObjectType, Field,ID } from 'type-graphql';
import User from '../users'
import {ODocument } from '../common'
@ObjectType()
export default class Driver {
  @Field(type => ID)
  id: string;
  @Field({nullable:true})
  passport: string
  @Field({nullable:true})
  national_id: string;
  @Field(()=>User)
  user: User
  @Field(()=> ODocument ,{nullable:true})
  documents!:[ODocument];
  @Field({nullable:true})
  work_phone_number: string;
  @Field({nullable:true})
  verified: Boolean;
  @Field({nullable:true})
  driving_permit:string;
  @Field({nullable:true})
  truck_insurance!:string;
  @Field({nullable:true})
  truck_plate_number!:string;
  @Field({nullable:true})
  carte_jaune:string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
@ObjectType()
export class DriverLogin {
  @Field()
  driver: Driver;
  @Field()
  token: string;
}

@ObjectType()
export class DriverWithMessage {
  @Field()
  driver: Driver;
  @Field()
  message: string;
}

@ObjectType()
export class DriversPayload {
  @Field(()=>Driver)
  drivers?: [Driver];
  @Field()
  count?: number;
}