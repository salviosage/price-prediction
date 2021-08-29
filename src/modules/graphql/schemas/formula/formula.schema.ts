import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Formula {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  lifeTime: number;

  @Field()
  averageTrips: number;
}

@ObjectType()
export class TotalPrice {
  @Field()
  clientPrice?: string;

  @Field()
  driverPrice?: string;
}

