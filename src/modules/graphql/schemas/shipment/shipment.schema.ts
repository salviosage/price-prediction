import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass} from "@typegoose/typegoose";
import { Ref } from "../types";
import {TruckOrder} from "../truckOrder/truck.order.schema";
import {Note} from "../notes/notes.schema";
import {Driver} from "../drivers/driver.schema";
import {DealStatus} from '../common'



@ObjectType({ description: "The Shipment model" })
export  class Shipment {
    @Field(()=> ID)
    _id: String;

    @Field()
    @Property({ nullable: true })
    user_id: String;

    @Field()
    @Property({ required: true })
    title: String;

    @Field()
    @Property({ default: DealStatus.CREATED, required: true, nullable: true })
    status: DealStatus;

    @Field(_type => TruckOrder)
    @Property({ ref: TruckOrder, required: true })
    orderId: Ref<TruckOrder>
    _doc: any;

    @Field(_type => Driver)
    @Property({ ref: Driver, required: true })
    assignedDrivers: Ref<[Driver]>
  

    @Field(_type => Note)
    @Property({ ref: Note, required: false  })
    notes: Ref<[Note]>

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
    
}


export const ShipmentModel = getModelForClass(Shipment,{ schemaOptions: { timestamps: true } });


@ObjectType()
export class CreaateShipmentResponse {
  @Field()
  shipment: Shipment;
  @Field()
  message: string;
}
@ObjectType()
export class ShipmentsResponse {
  @Field(() => Shipment)
  shipments: [Shipment];
  @Field()
  count: number;
}
