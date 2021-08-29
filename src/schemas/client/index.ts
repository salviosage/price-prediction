import { Field, ObjectType,ID } from 'type-graphql';
import User from '../users'
import ShipmentOrder from '../shipmentOrder'
import {OContact,ODocument } from '../common'

@ObjectType()
export default class Client {
  @Field(type => ID)
  id: string;
  @Field(()=>User)
  user: User
  @Field(()=>ShipmentOrder,{nullable:true})
  shipment_orders!:[ShipmentOrder];
  @Field(()=> OContact ,{nullable:true})
  contact_persons!:[OContact];
  @Field(()=> ODocument ,{nullable:true})
  documents!:[ODocument];
  @Field()
  verified: boolean;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}



@ObjectType()
export class ClientLogin {
  @Field()
  client: Client;
  @Field()
  token: string;
}

@ObjectType()
export class ClientSignup {
  @Field()
  message: string;
}
@ObjectType()
export class ClientsPayload {
  @Field(()=>Client)
  clients?: [Client];
  @Field()
  count?: number;
}