import { ObjectType, Field,ID } from 'type-graphql';
import {DealStatus} from '../common/enums.types'
import Driver from '../drivers'
import Note from '../notes'
import ShipmentOrder from '../shipmentOrder'


@ObjectType()
export default class Shipment { 
  @Field(type => ID)
  id: string;
  @Field()
  title: string;
  @Field()
  status: DealStatus;
  @Field({nullable:true})
  shipmentOrder:ShipmentOrder
  @Field(()=>Driver,{nullable:true})
  assignedDrivers!:[Driver];
  @Field(()=>Note,{nullable:true})
  notes!:[Note];
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}



@ObjectType()
export class ShipmentsPayload {
  @Field(()=>Shipment)
  shipments?: [Shipment];
  @Field()
  count?: number;
}