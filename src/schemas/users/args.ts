import { ArgsType,InputType, Field} from 'type-graphql';
import {DepartmentType,UserType,AccountStatusTypes} from '../common/enums.types'
import {UserUpdateInput,UserInput} from '../common'
import {
  Min,
  Max,
} from 'class-validator';
@ArgsType()
export class SignupArgs {
  @Field(()=>UserInput)
  userInfo: UserInput

}

@ArgsType()export class UpdateMeArgs{
  @Field()
  updates:UserUpdateInput
}

@ArgsType()
export class SignInWithPhoneArgs {
  @Field()
  phone_number: string;
  @Field()
  password: string;
}

@ArgsType()
export class ValidateOTPArgs {
  @Field()
  phone_number: string;
  @Field()
  otp: string;
}
@ArgsType()
export class SignInWithEmailArgs {
  @Field()
  email: string;
  @Field()
  password: string;
}
@ArgsType()
export class RequestResetPasswordArgs {
  @Field()
  email: string;
}

@ArgsType()
export class ResetPasswordArgs {
  @Field()
  password: string;
  @Field()
  passwordResetToken: string;
 
}
@ArgsType()
export class UpdateUserArgs {
  @Field()
  id: string;
  @Field()
  updates: UserUpdateInput;
 
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