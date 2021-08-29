import { MiddlewareFn } from 'type-graphql';
import Driver from '../../database/models/Driver'
import { ErrorResponse } from '../../helpers/common.helper';
import { UpdateRealTimeDriverValidator,CreateRealTimeDriverValidator} from '../../helpers/realtimeDrivers/realtime.drivers.helper';


export const verifyDriver: MiddlewareFn<any> = async ({ context }, next) => {
  
    
  const {id}=context?.user;
  const verify = await Driver.findById(id);
  if (!verify) {
    return ErrorResponse({ errors: { error: "Can't verify a driver." } });
  }
  return next();
};

export const updateRealtimeDriverMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  
  const { error: errors } = UpdateRealTimeDriverValidator.validate(args);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};
export const createRealTimeDriverMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {

  const { error: errors } = CreateRealTimeDriverValidator.validate(args);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};