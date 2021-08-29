import { MiddlewareFn } from 'type-graphql';
import Role from '../../database/models/Role';
import { ErrorResponse } from '../../helpers/common.helper';
import { CreateRoleValidation, UpdateRoleValidation } from '../../helpers/role/role.helper';


export const VerifyRole: MiddlewareFn = async ({ args }, next) => {
 
let updt;
  if (args.updates){
    updt= args.updates
    
  }else {
    updt= args
  }
  const { title } = updt;
  if(title){
    const verify = await Role.findOne({
      title
    });
    if (verify) {
      return ErrorResponse({ errors: 'Role already exist' });
    }
  }
  
  return next();
};



export const CreateRoleMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const a = await JSON.parse(JSON.stringify(args))
  const { error: errors } = CreateRoleValidation.validate(a);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};

export const UpdateRoleMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const a = await JSON.parse(JSON.stringify(args))
  const { updates } = a
  const { error: errors } = UpdateRoleValidation.validate(updates);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};




