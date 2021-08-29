import { Args, Mutation, Resolver } from 'type-graphql';
import { Depreciation, Fuel } from '../utils/data';
import { ErrorResponse } from '../helpers/common.helper';
import { IFuel } from '../interfaces/formula.interface';
import { FormulaArgs } from '../schemas/formula/args';
import numeral from 'numeral';
import { Formula, TotalPrice } from '../schemas/formula';
import { coefficientSelector } from '../utils/rangeCoefficientSelector';
import { round } from '../utils/roundingPrice';

@Resolver(Formula)
export default class {
  @Mutation((returns) => TotalPrice, { nullable: true })
  static calculate(@Args() args: FormulaArgs) {
    let clientPrice:number = 0;
    let driverPrice:number = 0;
    let highEndPrice: number = 0;
    let lowEndPrice:number = 0;

    const { depreciationName, distance } = args;
    const verifyDepreciation = Depreciation.find(
      (item) => item.name === depreciationName,
    );

    if (verifyDepreciation) {
      const { price, lifeTime, averageTrips, name } = verifyDepreciation;
      const daysOfYear = 365;
      // const depriciationTotal = price / (lifeTime * averageTrips * daysOfYear);
      const findFuel: IFuel | undefined = Fuel.find(
        (item) => item.depriciationName === depreciationName,
      );
      console.log(findFuel);
      const km = findFuel?.fuelConsumption;

      if(findFuel?.depriciationName !== 'Motorcycle'){
      const calculateFuel = (Number(distance) / Number(km?.km)) * 1073 * 2;
      const {min, max} = coefficientSelector(Number(distance));
      console.log({
        min,
        max
      });
      lowEndPrice = calculateFuel * Number(min);
      highEndPrice = calculateFuel * Number(max);
      const median = (lowEndPrice + highEndPrice) / 2;
      // const secondRange = (median + lowEndPrice) / 2;
      const priceDifference = median * 0.1;
      driverPrice = median - priceDifference;
      // const clientPrice = priceDifference + median + 1000;
      if(driverPrice < 100000){
        clientPrice = driverPrice + 5000;
      }
      else {
        clientPrice = driverPrice + 10000;
      }

      console.log({
        driverPrice,
        clientPrice,
        lowEndPrice,
        highEndPrice,
        priceDifference,
        median
      })

      console.log('distance', {
        fuel: calculateFuel,
        distance
      });

    }
    else {
    const calculateFuel = (Number(distance) / Number(km?.km)) * 1073;

    clientPrice = calculateFuel * 2.7;
    highEndPrice = calculateFuel * 3;
    driverPrice = clientPrice - (clientPrice * 0.2);
    lowEndPrice = driverPrice - (driverPrice * 0.2);
    console.log({
      lowEndPrice,
      highEndPrice,
      driverPrice,
      clientPrice
    })

    }

      return {
        clientPrice: `${numeral(round(clientPrice)).format('(0,0)')} RWF -- ${numeral(round(highEndPrice)).format('(0,0)')} RWF`,
        driverPrice: `${numeral(round(lowEndPrice)).format('(0,0)')} RWF -- ${numeral(round(driverPrice)).format('(0,0) ')} RWF`
      };
    }

    return ErrorResponse({
      errors: { depreciationName: 'depreciation name could not be found.' },
    });
  }
}
