import { Args, Mutation, Resolver } from 'type-graphql';
import { orderNotificationArgs } from '../schemas/emailNotifier/args';
import axios from 'axios';
import { orderResponse } from '../schemas/makeOrder/orderResponse';
import notifier from './email.notifier.resolver';


@Resolver()
export default class {
    @Mutation((returns) =>  orderResponse, {nullable: true})
    async placeAnOrder(@Args() args:orderNotificationArgs ){
        const {
            names,
            weightRange,
            packageDescription,
            paymentMethod,
            pickupLocation,
            destination,
            phoneNumber
        } = args;
        const [firstName, lastName] = [names.trim().split(' ')[0],names.split(' ').slice(1).join(' ').trim()];
        const data = [
            { property: 'firstname', value: firstName },
            { property: 'lastname', value: lastName },
            { property: 'weight_range', value: weightRange },
            { property: 'package_description', value: packageDescription },
            { property: 'payment_method', value: paymentMethod },
            { property: 'pickup_location', value: pickupLocation },
            { property: 'destination', value: destination },
            { property: 'phone', value: phoneNumber },
            { property: 'hs_lead_status', value: 'NEW' }
          ];
          const URL = `https://api.hubapi.com/contacts/v1/contact/?hapikey=${process.env.HAPI_KEY}`;

          const result = await axios
                .post( URL, { properties: data })
                .then(async (res) => {
                    const { status } = res;
                    await notifier.notifyOperations(args);
                    return {
                        status,
                        message: 'Your Order Has been Placed!!'
                    }
                })
                .catch((error) => {
                    const {validationResults, status, message} = error.response.data;
                    return {
                        status,
                        message,
                        errors: validationResults
                    }

                });
        return result

    }

}