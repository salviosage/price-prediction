import {ArgsType, Field} from 'type-graphql';

@ArgsType()
export class orderNotificationArgs{
    @Field()
    names: string
    @Field()
    phoneNumber: string
    @Field()
    weightRange: string
    @Field()
    packageDescription: string
    @Field()
    pickupLocation: string
    @Field()
    destination: string
    @Field()
    paymentMethod: string
}