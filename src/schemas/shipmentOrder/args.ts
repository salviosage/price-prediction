import { ArgsType,InputType, Field} from 'type-graphql';
import {CarTypeEn,WeightRangeType} from '../common/enums.types'
import {
  Min,
  Max,
} from 'class-validator';
import {IADriver, IContact,IRegion,ITruck} from '../common'

@ArgsType()
export class AddShipmentOrderArgs {
  @Field(()=>IRegion)
  from:IRegion;
  @Field(()=>IRegion)
  to:IRegion;
  @Field(()=>IContact)
  contact: IContact;
  @Field(()=>IContact,{nullable:true})
  destinationContact: IContact;
  @Field()
  goodsDetails:String;
  @Field(()=>ITruck)
  trucksRequested:[ITruck];
  @Field()
  timeToDeliver:Date;

}
@InputType()
export class UpdateShipmentOrderInput {
 
  @Field(()=>IRegion,{nullable:true})
  from:IRegion;
  @Field(()=>IRegion,{nullable:true})
  to:IRegion;
  @Field(()=>IContact,{nullable:true})
  contact: IContact;
  @Field(()=>IContact,{nullable:true})
  destinationContact: IContact;
  @Field({nullable:true})
  goodsDetails:String;
  @Field(()=>ITruck)
  trucksRequested:[ITruck];
  @Field({nullable:true})
  weightRange:WeightRangeType;
  @Field({nullable:true})
  timeToDeliver:Date;
}


@ArgsType()
export class UpdateShipmentOrderArgs {
  @Field()
  id: string;
  @Field()
  updates: UpdateShipmentOrderInput;
 
}

@ArgsType()
export class AssignDriverToShipmentOrderArgs {
  @Field()
  shipmentId: string;
  @Field()
  driverDate: IADriver;
 
}

@ArgsType()
export class GetShipmentOrdersArgs {
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