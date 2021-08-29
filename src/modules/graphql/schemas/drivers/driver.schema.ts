import { ObjectType, Field, ArgsType, InputType } from 'type-graphql';
import { Ref,prop as Property, getModelForClass,pre} from "@typegoose/typegoose";
import {User} from '../users/users.schema'
// import { Ref } from "../types";
import {WeightRangeType,Roles,CarTypeEn,PaymentMethodEn,OLocation} from '../common'

@ObjectType({ description: "Driver Model" })
export class Driver {
  @Field()
  _id: string;

  @Field(_type => User)
  @Property({ ref: User,required:true })
  public user: Ref<User>;
  _doc: any;

  @Field()
  @Property()
  nationalId: string;

  @Field()
  @Property({ enum: CarTypeEn })
  vehicleType: CarTypeEn;

  @Field()
  @Property()
  drivingLicense: string;

  @Field()
  @Property()
  isOwner: boolean;

  @Field()
  @Property()
  plateNumber: string;

  @Field()
  @Property()
  insuranceExpiresOn: Date;

  @Field()
  @Property()
  availableTime: string;

  @Field()
  @Property({ enum: PaymentMethodEn })
  paymentMethod: PaymentMethodEn;

  @Field()
  @Property()
  accountNumber: string;

  @Field((type) => [OLocation])
  @Property({ _id: false })
  workingRegions: OLocation[];
}
export const DriverModel = getModelForClass(Driver ,{ schemaOptions: { timestamps: true } });

@ObjectType()
export class CreateDriverResponse {
 
  @Field()
  message: string;
}
@ObjectType()
export class DriversResponse {
  
  @Field(() => Driver,{nullable:true})
  drivers?: [Driver];
  @Field({nullable:true})
  count?: number;
}




@ObjectType()
export class CreaateDriverResponse {
  // @Field()
  // note: Driver;
  @Field()
  message: string;
}
