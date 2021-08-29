import {ArgsType, Field} from 'type-graphql';

@ArgsType()
export class mailFormat{
    @Field()
    from: string
    @Field()
    to: string
    @Field()
    subject: string
    @Field()
    html: string
}