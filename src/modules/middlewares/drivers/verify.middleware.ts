import { MiddlewareFn } from 'type-graphql';
import { DriverModel } from '../../graphql/schemas/drivers/driver.schema';
import { ErrorResponse } from '../../helpers/users/users.helper';

// export const verifyPhoneNumber: MiddlewareFn = async ({ args }, next) => {
//   const { phoneNumber } = args;
//   const verify = await DriverModel.findOne({
//     phoneNumber,
//   });
//   if (verify) {
//     return ErrorResponse({ errors: { error: 'phone number already exist.' } });
//   }
//   return next();
// };

export const verifyNationalId: MiddlewareFn = async ({ args }, next) => {
  const { nationalId } = args;
  const verify = await DriverModel.findOne({ nationalId });
  if (verify) {
    return ErrorResponse({ errors: { error: 'national ID already exist.' } });
  }
  return next();
};
export const verifyPlateNumber: MiddlewareFn = async ({ args }, next) => {
  const { plateNumber } = args;
  const verify = await DriverModel.findOne({
    plateNumber,
  });
  if (verify) {
    return ErrorResponse({ errors: { error: 'plate number already exist.' } });
  }
  return next();
};
