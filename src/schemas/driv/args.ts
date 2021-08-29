import { ArgsType,InputType, Field} from 'type-graphql';
import {DepartmentType,UserType,AccountStatusTypes} from '../common/enums.types'
import {
  Min,
  Max,
} from 'class-validator';

@InputType()
 export class WorkInfoArgs {
  @Field()
  position!: string;
  @Field({ nullable: true })
  startingDate!: Date;
  @Field({ nullable: true })
  endingDate!: Date;
  @Field()
  department: DepartmentType;
  @Field({ nullable: true })
  workEmail!: string;
  @Field({ nullable: true })
  workPhone!: string;
  @Field({ nullable: true })
  shirtSize!: string;
}
@ArgsType()
export class SignupArgs {
  @Field()
  first_name: string;
  @Field()
  other_names: string;
  @Field()
  email: string;
  @Field()
  phone_number: string;
  @Field()
  user_type: UserType;
  @Field({nullable:true})
  account_status: AccountStatusTypes;
  @Field({nullable:true})
  avatar!: string;
  @Field()
  password: string;

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
@ArgsType()export class UpdateMeArgs{
  @Field()
  updates:UserUpdateInput
}

@ArgsType()
export class SignInWithPhoneArgs {
  @Field()
  phoneNumber: string;
}

@ArgsType()
export class ValidateOTPArgs {
  @Field()
  phoneNumber: string;
  @Field()
  otp: string;
}
@ArgsType()
export class SignInWithEmailArgs {
  @Field()
  user_email: string;
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