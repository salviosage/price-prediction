import { ArgsType, Field, InputType } from 'type-graphql';
import {
  Min,
  Max, IsEmail
} from 'class-validator';
import {Roles,AuthType} from '../common'

@ArgsType()
export class SignupArgs {

  @Field({nullable:true})
  password?:string

  @Field({nullable:true})
  firstName?: string;

  @Field({nullable:true})
  @IsEmail()
  email?:string

  @Field({nullable:true})
  lastName?: string;

  @Field({nullable:true})
  @Max(799999999,{message: 'invalid phone number'})
  @Min(700000000,{message: 'invalid phone number'})
  phoneNumber?: number;

  @Field(()=> Roles, {defaultValue: Roles.NORMAL_USER} )
  userType: Roles;
}

@ArgsType()
export class SignInArgs {
  @Field()
  email: string;
  @Field()
  password: string;
}
@ArgsType()
export class ResetPasswordArgs {
  @Field()
  token: string;
  @Field()
  password: string;
}
@ArgsType()
export class ChangePassword{
  @Field()
  oldPasswrd:string
  @Field()
  newPassword:string
}
@ArgsType()
export class RequestResetPasswordArgs {
  @Field(()=> AuthType, {defaultValue: AuthType.email})
  authtype: AuthType;
  @Field({nullable:true})
  email: string;
  @Field({nullable:true})
  phone: number;

}
@ArgsType()
export class SignInWithPhoneArgs {
  @Field()
  phone: number;
}
@InputType()
export class UpdateUserTypes{
  

  @Field({nullable:true})
  firstName?: string;

  @Field({nullable:true})
  @IsEmail()
  email?:string

  @Field({nullable:true})
  lastName: string;

  @Field({nullable:true})
  @Max(799999999,{message: 'invalid phone number'})
  @Min(700000000,{message: 'invalid phone number'})
  phoneNumber?: number;

  @Field(()=> Roles,{nullable:true})
  userType?: Roles;
}
@ArgsType()
export class UpdateUserArgs{
@Field()
userId:string
@Field()
updates:UpdateUserTypes
}

@ArgsType()
export class GetUsersArgs {
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