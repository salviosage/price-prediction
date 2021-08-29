import Joi from '@hapi/joi';

export const ShipmentValidation = Joi.object({

    clientName: Joi.string()
    .min(2)
    .required(),
    goodsDetails: Joi.string()
    .min(5)
    .required(),
    // phoneNumber: Joi.string()
    // .regex(/^07[823]\d{7}$/)
    // .required()
    // .messages({
    // 'string.empty': `Phone Number can not be empty`,
    // 'string.pattern.base': `Phone Number should be a valid mobile number with 10 digits`
    // }),
    // destinationContact: Joi.string()
    // .regex(/^07[823]\d{7}$/)
    // .required()
    // .messages({
    // 'string.empty': `Phone Number can not be empty`,
    // 'string.pattern.base': `Phone Number should be a valid mobile number with 10 digits`
    // }),



  vehicleType: Joi.string()
    .valid('Fuso', 'Lifan', 'Daihatsu', 'Trailer', 'Pickups', 'Motorcycle')
    .required()
    .messages({
      'string.empty': 'Vehicle Name can not be empty',
      'any.only': "Vehicle Name should be one of 'Fuso', 'Lifan', 'Daihatsu', 'Trailer', 'Pickups', 'Motorcycle'"
    })
    ,

}); 
