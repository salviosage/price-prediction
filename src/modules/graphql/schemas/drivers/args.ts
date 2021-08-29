import { ArgsType,InputType, Field } from 'type-graphql';
import {
  Min,
  Max, IsEmail
} from 'class-validator';

import {CarTypeEn,PaymentMethodEn,ILocation} from '../common'
import {User} from '../users/users.schema'

@ArgsType()
export class CreateDriverArgs {
  @Field()
  public user: String;

  @Field()
  nationalId: string;

  @Field()
  vehicleInsurance: string;
  
  @Field()
  vehicleType: CarTypeEn;

  @Field()
  drivingLicense: string;

  @Field()
  isOwner: boolean;

  @Field()
  plateNumber: string;

  @Field({nullable: true})
  insuranceExpiresOn: Date;

  @Field({nullable: true})
  availableTime: string;

  @Field({nullable: true})
  paymentMethod: PaymentMethodEn;

  @Field({nullable: true})
  accountNumber?: string;

  @Field((type) => [ILocation], {nullable: true})
  workingRegions?: ILocation[];
}
@ArgsType()
export class DeleteDriver{
  @Field()
  driverId:string
}
@InputType()
export class UpdateDriverArgs {

  @Field({ nullable: true })
  nationalId?: string;

  @Field({ nullable: true })
  vehicleInsurance?: string;

  @Field({ nullable: true })
  vehicleType?: CarTypeEn;

  @Field({ nullable: true })
  drivingLicense?: string;

  @Field({ nullable: true })
  isOwner?: boolean;

  @Field({ nullable: true })
  plateNumber?: string;

  @Field({nullable: true})
  insuranceExpiresOn?: Date;

  @Field({nullable: true})
  availableTime?: string;

  @Field({nullable: true})
  paymentMethod?: PaymentMethodEn;

  @Field({nullable: true})
  accountNumber?: string;

  @Field((type) => [ILocation], {nullable: true})
  workingRegions?: ILocation[];
}
@ArgsType()
export class UpdateDriverAllArgs {
  @Field()
  driverId: string;
  @Field(() => UpdateDriverArgs)
  updates: UpdateDriverArgs
  
}
@ArgsType()
export class GetDriversArgs {
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
