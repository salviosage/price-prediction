import {ObjectType, Field} from 'type-graphql';
import { responseError } from './responseError';

@ObjectType()
export class orderResponse{
    @Field()
    status: string
    @Field()
    message: string
}