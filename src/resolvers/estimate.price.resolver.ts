import {Args, Query, Resolver} from 'type-graphql';
import { estimatePriceArgs } from '../schemas/estimatePrice/args';
import { Depreciation as vehicles } from '../utils/data';
import priceCalculator from './formula.resolver';
import { estimatePriceReturn } from '../schemas/estimatePrice';
import { isNumber } from 'util';
import { ErrorResponse } from '../helpers/common.helper';

@Resolver()
export default class {
    @Query((returns) => estimatePriceReturn, {nullable: true})
    async estimatePrice(@Args() args: estimatePriceArgs){
        const { distance, from, to } = args;
        if (!Number(distance)){
            return ErrorResponse({
                errors: { distance: 'distance must be a number...' }
            })
        }
        let tripPrices:{
            from: string,
            to: string,
            vehicle: string,
            price: string
        }[] = [];
        vehicles.map(vehicle => {
            const { clientPrice } = priceCalculator.calculate({depreciationName: vehicle.name, distance});
            if(clientPrice){
                tripPrices.push({
                    from,
                    to,
                    vehicle: vehicle.name,
                    price: clientPrice.split(' RWF')[0]
                });
            }
        });
        return {
            message: 'Success',
            data: tripPrices
        }
    }
}