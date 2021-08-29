import {Args, Mutation, Resolver} from 'type-graphql';
import { TotalPrice } from '../schemas/formula/formula.schema';
import { FormulaArgs } from '../schemas/formula/args';
import calculatePrice from './formula.resolver';

@Resolver()
export default class {
    @Mutation((returns) => TotalPrice, {nullable: true})
    calculateFare(@Args() args: FormulaArgs){
        const res = calculatePrice.calculate(args);
        return res;
    }
}