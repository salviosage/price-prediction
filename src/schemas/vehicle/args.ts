import { ArgsType,InputType, Field} from 'type-graphql';
import {CarTypeEn} from '../common/enums.types'
import {
  Min,
  Max,
} from 'class-validator';
import {IContact} from '../common'


@ArgsType()
export class AddVehicleArgs {
    @Field()
    paymentMethod: string;
    @Field({nullable:true})
    accountNumber:number
    @Field(()=>IContact,{nullable:true})
    ownerContact!:[IContact];
    @Field({nullable:true})
    insurance!: string;
    @Field()
    verified: boolean;
    @Field()
    phoneNumber: number;
    @Field()
    plateNumber:string;
    @Field()
    vehicleType:  CarTypeEn;
    @Field({nullable:true})
    insuranceExpiresOn!: Date;

}
@InputType()
export class UpdateVehicleInput {
 
    @Field({nullable:true})
    paymentMethod!: string;
    @Field({nullable:true})
    accountNumber!:number
    @Field(()=>IContact,{nullable:true})
    ownerContact!:[IContact];
    @Field({nullable:true})
    insurance!: string;
    @Field({nullable:true})
    verified!: boolean;
    @Field({nullable:true})
    phoneNumber!: number;
    @Field({nullable:true})
    plateNumber!:string;
    @Field({nullable:true})
    vehicleType!:  CarTypeEn;
    @Field({nullable:true})
    insuranceExpiresOn!: Date;
}


@ArgsType()
export class UpdateVehicleArgs {
  @Field()
  id: string;
  @Field()
  updates: UpdateVehicleInput;
 
}

@ArgsType()
export class GetVehiclesArgs {
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