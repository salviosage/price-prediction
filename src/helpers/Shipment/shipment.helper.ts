import Joi from '@hapi/joi';

export const CreateShipmentValidator = Joi.object({

  title: Joi.string()
  .min(5).required(),
  status: Joi.string()
  .required(),
  shipmentOrderId: Joi.string().required(),
  assignedDrivers: Joi.array(),

});
export const UpdateShipmentValidator = Joi.object({
  title: Joi.string()
  .min(5),
  status: Joi.string(),
  shipmentOrderId: Joi.string(),
  assignedDrivers: Joi.array(),
  });
