import { ArgsType,InputType, Field,ID } from 'type-graphql';
import {
  Min,
  Max,
} from 'class-validator';
import { ObjectId } from "mongodb";
import { DealStatus } from '../common';


@InputType()
export class UpdateShipmentInput {
  @Field({ nullable: true })
  title:string

  @Field(()=>DealStatus,{nullable: true })
  status: DealStatus;
 
}
@ArgsType()
export class CreateShipmentArgs {
  
  @Field()
  @Min(1)
  @Max(50)
  title:string

  @Field(()=> ID)
  orderId: ObjectId;
 
 
}

@ArgsType()
export class DeleteShipmentArgs {
  @Field()
  shipmentId: string;
}
@ArgsType()
export class UpdateShipmentArgs {
  @Field()
  shipmentId: string;
  @Field(() => UpdateShipmentInput)
  updates: UpdateShipmentInput
  
}


@ArgsType()
export class ShipmentNoteArgs {
  @Field()
  shipmentId: string;
  @Field(()=> String)
  noteId: ObjectId;
  
}
@ArgsType()
export class DriverToShipmentArgs {
  @Field()
  shipmentId: string;
  @Field(()=> String)
  driverId: ObjectId; 
}


@ArgsType()
export class GetShipmentsArgs {
  @Field(type => Number, { defaultValue: 0 })
  @Min(0)
  skip: number;

  @Field(type => Number)
  @Min(1)
  @Max(50)
  take = 25;

 // helpers - index calculations
  get startIndex(): number {
    return this.skip;
  }
  get endIndex(): number {
    return this.skip + this.take;
  }
}
