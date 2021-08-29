import { ArgsType,InputType, Field } from 'type-graphql';
import {
  Length,
  IsDate,
  Min,
  Max,
} from 'class-validator';
import {WeightRangeType,CarTypeEn,PaymentMethodEn,ILocation} from '../common'



@InputType()
export class updateTruckOrderInput {
  
  @Field(() => ILocation)
  from?: ILocation;
  @Field(() => ILocation)
  to?: ILocation;

  @Field({ nullable: true })
  @Max(799999999,{message: 'invalid phone number'})
  @Min(700000000,{message: 'invalid phone number'})
  phoneNumber?: number;

  @Field({ nullable: true })
  @Length(3, 30,{message: 'name should be 3 to 30  long'})
  clientName?: string;
  
  @Field(()=> CarTypeEn, {nullable: true} )
  vehicleType?: CarTypeEn;

  @Field({ nullable: true })
  @Length(3, 100,{message: 'goodsDetails should be 3 to 100 long'})
  goodsDetails?: string;

  @Field(()=>WeightRangeType,{ nullable: true })
  weightRange?: WeightRangeType;

  @Field(()=>PaymentMethodEn,{ nullable: true })
  paymentMethod?: PaymentMethodEn;

  @Field({ nullable: true })
  @IsDate()
  timeToDeliver?: Date;
 
}
@ArgsType()
export class CreateTruckOrderArgs {
  
  @Field(() => ILocation)
  from: ILocation;
  @Field(() => ILocation)
  to: ILocation;

  @Field()
  @Max(799999999,{message: 'invalid phone number'})
  @Min(700000000,{message: 'invalid phone number'})
  phoneNumber: number;

  @Field()
  @Length(3, 30,{message: 'name should be 3 to 30  long'})
  clientName: string;

  @Field(()=> CarTypeEn, {nullable: true} )
  vehicleType?: CarTypeEn;

  @Field({ nullable: true })
  @Length(3, 100,{message: 'goodsDetails should be 3 to 100 long'})
  goodsDetails?: string;

  @Field(()=>WeightRangeType,{ nullable: true })
  weightRange?: WeightRangeType;

  @Field(()=>PaymentMethodEn,{ nullable: true })
  paymentMethod?: PaymentMethodEn;

  @Field({ nullable: true })
  @IsDate()
  timeToDeliver?: Date;
 
}

@ArgsType()
export class DeleteTruckOrderArgs {
  @Field()
  truckOrderId: string;
}
@ArgsType()
export class UpdateTruckOrderArgs {
  @Field()
  truckOrderId: string;
  @Field(() => updateTruckOrderInput)
  updates: updateTruckOrderInput
  
}
@ArgsType()
export class GetTruckOrdersArgs {
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
