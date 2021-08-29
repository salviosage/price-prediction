import Joi from '@hapi/joi';

export const CreateShipmentOrderValidator = Joi.object({

  // weightRange: Joi.string()
  // .valid('0 to 25 kg','26 to50 kg','21 to 100 kg','101 to 300 kg','301 to 500 kg','501 kg to 1 ton','1 to 5 ton','5 to 10 ton','10 ton and above')
  // .required()
  // .messages({
  //   'string.empty': "Weight range shouldn't be open ",
  //   'any.only': "weight range should be in  '0 to 25 kg','26 to50 kg','21 to 100 kg','101 to 300 kg','301 to 500 kg','501 kg to 1 ton','1 to 5 ton','5 to 10 ton','10 ton and above'"
  // })
  // ,
  goodsDetails: Joi.string()
  .min(5),
  timeToDeliver: Joi.date()
  .min(Date.now())
  .required(),

from:Joi.object({
  type: Joi.string(),
  coordinates:Joi.array().items(Joi.number()),
  locationName:Joi.string(),
      }
      ).required(),
     
trucksRequested:Joi.array().items(
  Joi.object({
  type: Joi.string(),
  count:Joi.number()
})).required(),

to:Joi.object({
  type: Joi.string(),
  coordinates:Joi.array().items(Joi.number()),
  locationName:Joi.string(),
      }).required(),
contact:Joi.object({
  email: Joi.string(),
  names:Joi.string(),
  phoneNumber:Joi.number(),

}).required(),
});
export const UpdateShipmentOrderValidatorr = Joi.object({

    // weightRange: Joi.string()
    // .valid('0 to 25 kg','26 to50 kg','21 to 100 kg','101 to 300 kg','301 to 500 kg','501 kg to 1 ton','1 to 5 ton','5 to 10 ton','10 ton and above')
    // .messages({
    //   'any.only': "weight range should be in  '0 to 25 kg','26 to50 kg','21 to 100 kg','101 to 300 kg','301 to 500 kg','501 kg to 1 ton','1 to 5 ton','5 to 10 ton','10 ton and above'"
    // })
    // ,
    goodsDetails: Joi.string()
    .min(5),
    timeToDeliver: Joi.date()
    .min(Date.now())
    ,
    trucksRequested:Joi.array().items(
      Joi.object({
      type: Joi.string(),
      count:Joi.number()
    })),
  
  from:Joi.object({
    type: Joi.string(),
    coordinates:Joi.array().items(Joi.number()),
    locationName:Joi.string(),
        }),
  to:Joi.object({
    type: Joi.string(),
    coordinates:Joi.array().items(Joi.number()),
    locationName:Joi.string(),
        }),
  contact:Joi.object({
    email: Joi.string(),
    names:Joi.string(),
    phoneNumber:Joi.number(),
  
  }),
  });
