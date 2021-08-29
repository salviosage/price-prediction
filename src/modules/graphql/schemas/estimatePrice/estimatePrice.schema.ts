import {ObjectType, Field, Ctx} from 'type-graphql';

@ObjectType()
export class estimatePriceReturn {
    @Field({nullable: true})
    message?: string;
    @Field(type => [EstimatePriceStructure])
    data: EstimatePriceStructure[]
}

@ObjectType()
class EstimatePriceStructure {
    @Field()
    from: string;
    @Field()
    to: string;
    @Field()
    vehicle: string;
    @Field()
    price: string
}