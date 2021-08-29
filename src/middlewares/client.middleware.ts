
import { MiddlewareFn } from 'type-graphql';
import { UpdateClientValidator,ClientValidator } from '../helpers/client/client.helper'
import { ErrorResponse } from '../helpers/common.helper';

export const CreateCV: MiddlewareFn = ({ args }, next) => {
  const {
    userInfo, ...others
    
  } = args;

  const  { error } = ClientValidator .validate({
    ...others
  });
  if (error) {
    return ErrorResponse({ errors: error.message  });
  }
 
  return next();
};

export const UpdateCV: MiddlewareFn = ({ args }, next) => {
    const {
        userInfo, ...others
      
    } = args;
  
    const  { error } = UpdateClientValidator.validate({
      ...others
    });
    if (error) {
      return ErrorResponse({ errors: error.message  });
    }
   
    return next();
  };