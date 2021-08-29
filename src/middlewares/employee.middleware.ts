import { MiddlewareFn } from 'type-graphql';
import { EmployeeValidator,UpdateEmployeeValidator } from '../helpers/employee/employee.helper';
import { ErrorResponse } from '../helpers/common.helper';

export const CreateEV: MiddlewareFn = ({ args }, next) => {
  const {
    userInfo, ...others
  } = args;
  const  { error } = EmployeeValidator.validate({
    ...others
  });
  if (error) {
    return ErrorResponse({ errors: error.message  });
  }
  return next();
};

export const UpdateEV: MiddlewareFn = ({ args }, next) => {
    const {
        userInfo, ...others
    } = args;
    const  { error } = UpdateEmployeeValidator.validate({
      ...others
    });
    if (error) {
      return ErrorResponse({ errors: error.message  });
    }
    return next();
  };