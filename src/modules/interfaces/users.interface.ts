import { Field, InterfaceType } from 'type-graphql';

@InterfaceType()
export class IUser {
  @Field()
  // tslint:disable-next-line: variable-name
  _id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  avatar?: string;
  @Field()
  userType: string;
  @Field()
  phoneNumber: string;
}

@InterfaceType()
export class IUserLogin {
  @Field()
  token: string;
  @Field()
  user: IUser;
}
