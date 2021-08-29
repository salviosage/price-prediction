import { MiddlewareFn } from 'type-graphql';
import {signupValidator,signInValidator,UpdateMeValidator,signWithPhoneInValidator} from '../helpers/users/users.helper'
import {ErrorResponse} from '../helpers/common.helper'

export const CreateUIV: MiddlewareFn = ({ args }, next) => {
  const {
    userInfo, ...others
  } = args;

  const { error } = signupValidator.validate({
    ...userInfo 
  });
  if (error) {
    return ErrorResponse({ errors: error.message  });
  }
  return next();
};

export const LoginU: MiddlewareFn = ({ args }, next) => {
    const { error } = signInValidator.validate({
      ...args 
    });
    if (error) {
      return ErrorResponse({ errors: error.message  });
    }
    return next();
  };

  export const LoginWPU: MiddlewareFn = ({ args }, next) => {
    const { error } = signWithPhoneInValidator.validate({
      ...args
      
    });
    if (error) {
      return ErrorResponse({ errors: error.message  });
    }
    return next();
  };

export const UpdateUIV: MiddlewareFn = ({ args }, next) => {
    const {
      userInfo, ...others
    } = args;
  
    const { error } = UpdateMeValidator.validate({
      ...userInfo
      
    });
    if (error) {
      return ErrorResponse({ errors: error.message  });
    }
    return next();
  };