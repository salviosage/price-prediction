
import { Depreciation, Fuel } from './data';

import { IFuel } from './formula.interface';
import * as numeral from 'numeral'

import { coefficientSelector } from './rangeCoefficientSelector';
import { round } from './roundingPrice';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';


export default class {
 
  static calculate(depreciationName:string, distance:Number):{clientPrice:String ,driverPrice:String}{
    let clientPrice:number = 0;
    let driverPrice:number = 0;
    let highEndPrice: number = 0;
    let lowEndPrice:number = 0;

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

      const km = findFuel?.fuelConsumption;

      if(findFuel?.depriciationName !== 'Motorcycle' &&  findFuel?.depriciationName !== 'Lifan'){
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
    }
    else  {
      let calculateFuel = (Number(distance) / Number(km?.km)) * 1073;
      if(findFuel?.depriciationName === 'Lifan'){
        calculateFuel = (Number(distance) / Number(km?.km)) * 3950;
      }

    clientPrice = calculateFuel * 2.7;
    highEndPrice = calculateFuel * 3;
    driverPrice = clientPrice - (clientPrice * 0.2);
    lowEndPrice = driverPrice - (driverPrice * 0.2);

    }
console.log(clientPrice,lowEndPrice,highEndPrice,driverPrice);
      return {
        clientPrice: `${numeral(round(clientPrice)).format('(0,0)')} RWF -- ${numeral(round(highEndPrice)).format('(0,0)')} RWF`,
        driverPrice: `${numeral(round(lowEndPrice)).format('(0,0)')} RWF -- ${numeral(round(driverPrice)).format('(0,0) ')} RWF`
      };
    }
    throw new BadRequestException(
      'depreciation name could not be found.',
    );
    
  }
}