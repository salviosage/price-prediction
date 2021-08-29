import {ArgsType, Field} from 'type-graphql';

@ArgsType()
export class estimatePriceArgs {
    @Field()
    from: string;
    @Field()
    to: string;
    @Field()
    distance: string;
}