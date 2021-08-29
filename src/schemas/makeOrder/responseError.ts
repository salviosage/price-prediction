import {ObjectType, Field} from 'type-graphql';

@ObjectType()
export class responseError{
    @Field()
    isValid: boolean
    @Field()
    message: string
    @Field()
    error: string
    @Field()
    name: string
}