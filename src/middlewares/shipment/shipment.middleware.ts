import { MiddlewareFn } from 'type-graphql';
import ShipmentOrder from '../../database/models/ShipmentOrder';
import Driver from '../../database/models/Driver'
import { ErrorResponse } from '../../helpers/common.helper';
import { CreateShipmentValidator,UpdateShipmentValidator } from '../../helpers/Shipment/shipment.helper';
import Shipment from '../../database/models/Shipment';



export const verifyDriver: MiddlewareFn = async ({ args }, next) => {
  const { driverId} = args;
  const verify = await Driver.findOne({ id:driverId,verified:true });
  if (!verify) {
    return ErrorResponse({ errors: { error: "Can't assign driver to shipment ." } });
  }
  return next();
};

export const verifyShipmentOrder: MiddlewareFn = async ({ args }, next) => {
  const { shipmentOrderId } = args;
  const verify = await ShipmentOrder.findOne({
    id:ShipmentOrder,
  });
  
  if (!verify) {
    return ErrorResponse({ errors: { error: 'shipment order does not exist.' } });
  }
  const verify2= await Shipment.findOne({shipmentOrder:shipmentOrderId});
  if (verify2) {
    return ErrorResponse({ errors: { error: 'shipment order was dispached before.' } });
  }
  return next();
};





export const updateShipmentMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const {updates}=args
  const { error: errors } = UpdateShipmentValidator.validate(updates);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};
export const createShipmentMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const { error: errors } = CreateShipmentValidator.validate(args);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};
