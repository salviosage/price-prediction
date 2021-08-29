import { ObjectType, Field,ID } from 'type-graphql';
import {CarTypeEn} from '../common/enums.types'
import {OContact} from '../common'
@ObjectType()
export default class Vehicle { 
  @Field(type => ID)
  id: string;
  @Field()
  paymentMethod: string;
  @Field({nullable:true})
  accountNumber:number
  @Field(()=>OContact,{nullable:true})
  ownerContact!:[OContact];
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
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}



@ObjectType()
export class VehiclesPayload {
  @Field(()=>Vehicle)
  vehicles?: [Vehicle];
  @Field()
  count?: number;
}