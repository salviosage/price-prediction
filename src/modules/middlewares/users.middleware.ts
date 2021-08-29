import { MiddlewareFn } from 'type-graphql';
import {UserModel} from '../../modules/graphql/schemas/users/users.schema';
import {
  defaultCountryCode,
  ErrorResponse,
  signInValidator,
  signupValidator,
} from '../helpers/users/users.helper';

// export const verifyUserType: MiddlewareFn<any> = ({ args }, next) => {
//   const check = userType.find((item) => item === args.userType);
//   if (!check) {
//     ErrorResponse({
//       errors: 'The information provided is incorrect',
//     });
//   }

//   return next();
// };

export const verifyPhoneNumber: MiddlewareFn<any> = async ({ args }, next) => {
  const { phoneNumber } = args;
  const check = await UserModel.find({
    phoneNumber,
  });
  if (check.length > 0) {
    ErrorResponse({
      errors: { phoneNumber: 'phone number already exist' },
    });
  }

  return next();
};
export const verifyEmail: MiddlewareFn<any> = async ({ args }, next) => {
  const { email } = args;
  const check = await UserModel.find({
    email,
  });
  if (check.length > 0) {
    ErrorResponse({
      errors: { email: 'email already exist' },
    });
  }

  return next();
};

export const signInMiddl: MiddlewareFn<any> = ({ args }, next) => {
  const { phoneNumber } = args;
  const { error: errors } = signInValidator.validate({ phoneNumber });
  if (errors) {
    ErrorResponse({ errors: errors.details });
  }

  return next();
};

export const signUpMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const { error: errors } = signupValidator.validate(args);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};
