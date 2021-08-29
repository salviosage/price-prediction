import { ArgsType,InputType, Field} from 'type-graphql';
import {
  Min,
  Max,
} from 'class-validator';
import {DealStatus} from '../common/enums.types'


@ArgsType()
export class AddShipmentArgs {
   
  @Field()
  title: string;
  @Field({defaultValue:DealStatus.CREATED})
  status: DealStatus;
  @Field({nullable:true})
  shipmentOrderId:string
  @Field(type => [String],{nullable:true})
  assignedDrivers!:string[];

}
@InputType()
export class UpdateShipmentInput {
 
  @Field({nullable:true})
  title: string;
  @Field({nullable:true})
  status: DealStatus;
  @Field({nullable:true})
  shipmentOrderId:string
  @Field(type => [String],{nullable:true})
  assignedDrivers!:string[];
  
}


@ArgsType()
export class UpdateShipmentArgs {
  @Field()
  id: string;
  @Field()
  updates: UpdateShipmentInput;
 
}
@ArgsType()
export class AssignDriverToShipmentArgs {
  @Field()
  shipmentId: string;
  @Field()
  driverId: string;
 
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