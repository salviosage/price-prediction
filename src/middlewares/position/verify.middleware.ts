
import { MiddlewareFn } from 'type-graphql';
import Department from '../../database/models/Department';
import Position from '../../database/models/Position';
import { ErrorResponse } from '../../helpers/common.helper';
import { CreatePositionValidation, UpdatePositionValidation } from '../../helpers/position/position.helper';


export const verifyDepartment: MiddlewareFn = async ({ args }, next) => {
  let updt;
  if (args.updates){
    updt= args.updates
    
  }
  const { department } = updt;
  if (department){
    const verify = await Department.findById({
      department,
    });
    if (!verify) {
      return ErrorResponse({ errors: 'Department does not exist' });
    }
  }
  
  return next();
};



export const verifyExistingPosition: MiddlewareFn = async ({ args }, next) => {
  let updt;
  if (args.updates){
    updt= args.updates
    
  }else {
    updt= args
  }
  const { title } = updt;
  if(title){
    const verify = await Position.findOne({
      title
    });
    if (verify) {
      return ErrorResponse({ errors: 'Position already exist' });
    }
  }
  
  return next();
};


export const CreatePositionMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const a = await JSON.parse(JSON.stringify(args))
  const { error: errors } = CreatePositionValidation.validate(a);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};

export const UpdatePositionMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const a = await JSON.parse(JSON.stringify(args))
  const { updates } = a
  const { error: errors } = UpdatePositionValidation.validate(updates);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};



