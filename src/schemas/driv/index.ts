import { Field, ObjectType,ID } from 'type-graphql';
import {DepartmentType,UserType} from '../common/enums.types'

@ObjectType()
 export class WorkInfo {
  @Field()
  position: string;
  @Field({nullable:true})
  startingDate!: Date;
  @Field({nullable:true})
  endingDate!: Date;
  @Field()
  department: DepartmentType;
  @Field({nullable:true})
  workEmail!: string;
  @Field({nullable:true})
  workPhone!: string;
  @Field({nullable:true})
  shirtSize!: string;

}
@ObjectType()
export default class User {
  @Field(type => ID)
  id: string;
  @Field()
  firstName: string;
  @Field()
  otherNames: string;
  @Field()
  email: string;
  @Field()
  phoneNumber: string;
  @Field()
  email_verified: boolean;
  @Field()
  phone_number_verified: boolean;
  @Field()
  userType: UserType;
  @Field()
  account_status: UserType;
  @Field({nullable:true})
  avatar!: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}



@ObjectType()
export class UserLogin {
  @Field()
  user: User;
  @Field()
  token: string;
}

@ObjectType()
export class UserSignup {
  @Field()
  message: string;
}
@ObjectType()
export class UsersPayload {
  @Field(()=>User)
  users?: [User];
  @Field()
  count?: number;
}