import { ObjectType, Field, InputType} from 'type-graphql';
import {CarTypeEn} from './enums.types'
import Driver from '../drivers'
import {DepartmentType,UserType,AccountStatusTypes} from './enums.types'

@ObjectType()
export class ORegion {
  @Field()
  type: string;
  @Field(type => [Number])
  coordinates: number[];
  @Field({ nullable: true })
  locationName: string;   
      
}
@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  first_name!: string;
  @Field({ nullable: true })
  other_names!: string;
  @Field({ nullable: true })
  phone_number!: string;
  @Field({ nullable: true })
  user_type!: UserType;
  @Field({ nullable: true })
  avatar!: string;
  @Field({nullable:true})
  account_status: AccountStatusTypes;
}
@InputType()
 export class UserInput{
  @Field()
  first_name: string;
  @Field()
  other_names: string;
  @Field()
  email: string;
  @Field()
  phone_number: string;
  @Field({nullable:true})
  user_type!: UserType;
  @Field({nullable:true})
  account_status!: AccountStatusTypes;
  @Field({nullable:true})
  avatar!: string;
  @Field()
  password: string;
}

@ObjectType()
export class ODocument {
  @Field()
  documentId: string;
  @Field({ nullable: true })
  url: string;
  @Field({ nullable: true })
  type: string;
  @Field({ nullable: true })
  verified:boolean
}

@InputType()
 export class IRegion {
  @Field({ nullable: true })
  type!: string;
  @Field(type => [Number],{ nullable: true })
  coordinates!: number[];
  @Field({ nullable: true })
  locationName!: string;
}

@InputType()
export class IDocument {
  
  @Field({ nullable: true })
  documentId: string;
  @Field({ nullable: true })
  url: string;
  @Field({ nullable: true })
  type: string;
  @Field({ nullable: true })
  verified:boolean
}

@ObjectType()
export class OContact {
  @Field({ nullable: true })
  phoneNumber: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  names: string
  @Field({ nullable: true })
  description: string
}
@InputType()
export class IContact {
    @Field({ nullable: true })
    phoneNumber: string;
    @Field({ nullable: true })
    email: string
    @Field({ nullable: true })
    names: string
    @Field({ nullable: true })
    description: string
}

@ObjectType()
export class OTruck {
  @Field({ nullable: true })
  type: CarTypeEn;
  @Field({ nullable: true })
  count: number;
  
}
@InputType()
export class ITruck {
    @Field({ nullable: true })
    type: CarTypeEn;
    @Field({ nullable: true })
    count: number
    
}

@ObjectType()
export class OADriver {
  @Field({ nullable: true })
  driver: Driver;
  @Field({ nullable: true })
  price: number;
  
}
@InputType()
export class IADriver {
    @Field()
    driver: String;
    @Field()
    price: number
    
}