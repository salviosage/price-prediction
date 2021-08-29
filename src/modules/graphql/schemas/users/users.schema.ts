import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass,pre} from "@typegoose/typegoose";
import { Ref } from "../types";
import {WeightRangeType,Roles,CarTypeEn,PaymentMethodEn,OLocation} from '../common'
import bcrypt from 'bcryptjs'


@pre<User>('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
  
})

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field()
  @Property()
  firstName: string;

  @Field()
  @Property()
  lastName: string;

  @Field()
  @Property({ unique: true })
  public email:string

  @Field()
  @Property({ unique: true })
  public phoneNumber?: number;

  @Field()
  @Property({ enum: Roles,default:Roles.NORMAL_USER })
  userType?: Roles;

  @Field()
  @Property({default:false})
  verified: boolean;

  @Field()
  @Property({ default: false })
  approved?: boolean;

  @Field()
  @Property({ default:false })
  is_online: boolean;

  @Field()
  @Property({ default: false })
  isActive?: boolean;

  @Field()
  @Property()
  passwordResetToken?: string;

  @Field()
  @Property()
  passwordResetTokenExpiry?: Date;


  @Property()
  password:string

  @Field()
  @Property()
  avatarPublicId?: String;

  @Field()
  @Property()
  avatar?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
export const UserModel = getModelForClass(User ,{ schemaOptions: { timestamps: true } });



@ObjectType()
export class LoginPayload {
  @Field()
  user: User;
  @Field()
  token: string;
}
@ObjectType()
export class SignupPayload {
  @Field()
  user: User;
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