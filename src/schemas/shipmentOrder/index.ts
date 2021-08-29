import { ObjectType, Field,ID } from 'type-graphql';
import {OContact, ORegion, OTruck,OADriver} from '../common'


@ObjectType()
export default class ShipmentOrder { 
  @Field(type => ID)
  id: string;
  @Field(()=>ORegion)
  from:ORegion;
  @Field(()=>ORegion)
  to:ORegion;
  @Field(()=>OContact)
  contact: OContact;
  @Field(()=>OContact,{nullable:true})
  destinationContact: OContact;
  @Field({nullable:true})
  goodsDetails:String;
  @Field(()=>OTruck,{nullable:true})
  trucksRequested:[OTruck];
  @Field(()=>OADriver,{nullable:true})
  assignedDrivers:[OADriver];
  @Field()
  timeToDeliver:Date;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;

}



@ObjectType()
export class ShipmentOrdersPayload {
  @Field(()=>ShipmentOrder)
  shipmentOrders?: [ShipmentOrder];
  @Field()
  count?: number;
}