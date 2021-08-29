import { MiddlewareFn } from 'type-graphql';
import Department from '../../database/models/Department';
import { ErrorResponse } from '../../helpers/common.helper';
import { CreateDepartmentValidation, UpdateDepartmentValidation } from '../../helpers/department/department.helper';


export const verifyDepartment: MiddlewareFn = async ({ args }, next) => {
 
let updt;
  if (args.updates){
    updt= args.updates
    
  }else {
    updt= args
  }
  const { title } = updt;
  if(title){
    const verify = await Department.findOne({
      title
    });
    if (verify) {
      return ErrorResponse({ errors: 'Department already exist' });
    }
  }
  
  return next();
};



export const CreateDepartmentMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const a = await JSON.parse(JSON.stringify(args))
  const { error: errors } = CreateDepartmentValidation.validate(a);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};

export const UpdateDepartmentMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const a = await JSON.parse(JSON.stringify(args))
  const { updates } = a
  const { error: errors } = UpdateDepartmentValidation.validate(updates);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};




