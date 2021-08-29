import { MiddlewareFn } from 'type-graphql';
import Vehicle from '../../database/models/Vehicle'
import { ErrorResponse } from '../../helpers/common.helper';
import { CreateVehicleValidator,UpdateVehicleValidator } from '../../helpers/vehicles/vehicle.helper';



export const verifyInsurance: MiddlewareFn = async ({ args }, next) => {
  const { insurance} = args;
  const verify = await Vehicle.findOne({ insurance });
  if (verify) {
    return ErrorResponse({ errors: { error: 'Insurance already in use .' } });
  }
  return next();
};

export const verifyPlateNumber: MiddlewareFn = async ({ args }, next) => {
  const { plateNumber } = args;
  const verify = await Vehicle.findOne({
    plateNumber,
  });
  if (verify) {
    return ErrorResponse({ errors: { error: 'plate number already exist.' } });
  }
  return next();
};





export const updateVehicleMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const {updates}=args
  const { error: errors } = UpdateVehicleValidator.validate(updates);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};
export const createVehicleMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const { error: errors } = CreateVehicleValidator.validate(args);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};
