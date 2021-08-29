import {ObjectType, Field} from 'type-graphql';

@ObjectType()
export class notification {
    @Field()
    message: string
}