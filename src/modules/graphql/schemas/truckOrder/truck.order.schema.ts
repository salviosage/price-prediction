import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass} from "@typegoose/typegoose";
import { Ref } from "../types";
import {Note} from "../notes/notes.schema";
import {WeightRangeType,CarTypeEn,PaymentMethodEn,OLocation} from '../common'


@ObjectType({ description: "The truck order  model" })
export  class TruckOrder {
  @Field()
  _id: string;
  
  @Field(() => OLocation)
  @Property({ _id: false })
  public from: OLocation;

  @Field(() => OLocation)
  @Property({ _id: false })
  public to: OLocation;

  @Field()
  @Property()
  public phoneNumber: number;

  @Field()
  @Property()
  public clientName: string;

  @Field()
  @Property({ enum: CarTypeEn, addNullToEnum: true })
  public vehicleType: CarTypeEn;

  @Field()
  @Property()
  public goodsDetails?: string;

  @Field()

  @Property({ enum: WeightRangeType })
  weightRange: WeightRangeType;

  @Field()
  @Property({ enum: PaymentMethodEn})
  public paymentMethod?: PaymentMethodEn;
  
  @Field(_type => Note)
  @Property({ ref: Note, required: false  })
  notes: Ref<[Note]>

  @Field()
  @Property()
  public timeToDeliver: Date;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
export const TruckOrderModel = getModelForClass(TruckOrder ,{ schemaOptions: { timestamps: true } });
@ObjectType()
export class TruckOrderResponse {
  @Field()
  TruckOrder: TruckOrder;
  @Field()
  message: string;
}
@ObjectType()
export class TruckOrdersResponse {
  @Field(() => [TruckOrder])
  @Property()
  TruckOrders: [TruckOrder];
  @Field()
  @Property()
  count: number;
}
