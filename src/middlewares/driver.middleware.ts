import { MiddlewareFn } from 'type-graphql';
import { DriverValidation,UpdateDriverValidation } from '../helpers/drivers/driver.helper';
import { ErrorResponse } from '../helpers/common.helper';

export const CreateDV: MiddlewareFn = ({ args }, next) => {
  const {
    userInfo, ...others
    
  } = args;

  const  { error } = DriverValidation.validate({
    ...others
  });
  if (error) {
    return ErrorResponse({ errors: error.message  });
  }
 
  return next();
};

export const UpdateDV: MiddlewareFn = ({ args }, next) => {
    const {
        userInfo, ...others
      
    } = args;
  
    const  { error } = UpdateDriverValidation.validate({
      ...others
    });
    if (error) {
      return ErrorResponse({ errors: error.message  });
    }
   
    return next();
  };