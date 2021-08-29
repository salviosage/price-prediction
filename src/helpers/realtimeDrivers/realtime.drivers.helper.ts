import Joi from '@hapi/joi';

export const CreateRealTimeDriverValidator = Joi.object({
  // driverId: Joi.string().required(),
  liveLocation:Joi.object({
    type: Joi.string(),
    coordinates:Joi.array().items(Joi.number()),
    locationName:Joi.string(),
        }).required(),
  });

export const UpdateRealTimeDriverValidator = Joi.object({
  // driverId: Joi.string(),
  liveLocation:Joi.object({
          type: Joi.string(),
          coordinates:Joi.array().items(Joi.number()),
          locationName:Joi.string(),
        }),
  });