import { MiddlewareFn } from 'type-graphql';
import { DriverValidation } from '../../helpers/drivers/validation.helper';
import { ErrorResponse } from '../../helpers/users/users.helper';

export const validate: MiddlewareFn = ({ args }, next) => {
  const {
    // nationalId,
    drivingLicense,
    vehicleType,
    vehicleInsurance,
    paymentMethod,
    // plateNumber,
    accountNumber,
    availableTime
  } = args;
  const { error } = DriverValidation.validate({
    // nationalId,
    drivingLicense,
    vehicleType,
    vehicleInsurance,
    paymentMethod,
    // plateNumber,
    accountNumber,
    availableTime
  });
  if (error) {
    return ErrorResponse({ errors: { validationError: error.message } });
  }
  return next();
};
