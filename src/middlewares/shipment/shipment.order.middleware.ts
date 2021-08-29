import { MiddlewareFn } from 'type-graphql';
import { ErrorResponse } from '../../helpers/common.helper';
import { CreateShipmentOrderValidator,UpdateShipmentOrderValidatorr } from '../../helpers/Shipment/shipment.order.helper';


export const updateShipmentOrderMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const {updates}=args
  const { error: errors } = UpdateShipmentOrderValidatorr.validate(updates);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};
export const createShipmentOrderMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const { error: errors } = CreateShipmentOrderValidator.validate(args);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};
