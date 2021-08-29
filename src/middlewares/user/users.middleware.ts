import { MiddlewareFn } from 'type-graphql';
import UserModel from '../../database/models/User';
import {userTypeTypes} from '../../constants'
import {
  defaultCountryCode,
  ErrorResponse,
} from '../../helpers/common.helper';
import {
  signInValidator,
  signupValidator,
  UpdateMeValidator,
  signWithPhoneInValidator
} from '../../helpers/users/users.helper';
import { astFromValue } from 'graphql';

export const verifyUserType: MiddlewareFn<any> = ({ args }, next) => {
  // const check = userTypeTypes.find((item) => item === args.user_type);
  // if (!check) {
  //   ErrorResponse({
  //     errors: 'The information provided is incorrect',
  //   });
  
  // }

  return next();
};

export const verifyPhoneNumber: MiddlewareFn<any> = async ({ args }, next) => {
  const { phoneNumber } = args;
  const check = await UserModel.find({
    phoneNumber: `${defaultCountryCode}${phoneNumber}`,
  });
  if (check.length > 0) {
    ErrorResponse({
      errors: 'phonenumber already exist' ,
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
      errors:  'email  already in use' ,
    });
  }

  return next();
};

export const signInMiddl: MiddlewareFn<any> = ({ args }, next) => {
  const { emailOrUserName } = args;
  const { error: errors } = signInValidator.validate({ emailOrUserName });
  if (errors) {
    ErrorResponse({ errors: errors.details });
  }

  return next();
};
export const signInWithPhoneMiddl: MiddlewareFn<any> = ({ args }, next) => {
  const { phoneNumber } = args;
  const { error: errors } = signWithPhoneInValidator.validate({phoneNumber});
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
export const updateUserMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const {updates}=args
  const { error: errors } = UpdateMeValidator.validate(updates);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};
