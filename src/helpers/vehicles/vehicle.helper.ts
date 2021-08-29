import Joi from '@hapi/joi';

export const CreateVehicleValidator = Joi.object({

  vehicleType: Joi.string()
  .valid('Fuso', 'Lifan', 'Daihatsu', 'Trailer', 'Pickups', 'Motorcycle')
  .required()
  .messages({
    'string.empty': 'Vehicle Name can not be empty',
    'any.only': "Vehicle Name should be one of 'Fuso', 'Lifan', 'Daihatsu', 'Trailer', 'Pickups', 'Motorcycle'"
  })
  ,
insurance: Joi.string()
  .min(3)
  .required(),
paymentMethod: Joi.string()
  .min(2)
  .required()
  .lowercase(),
plateNumber: Joi.string()
.regex(/^[Rr][A-Za-z]{2}[0-9]{3}[A-Za-z]$/)
.required()
.messages({
  'string.empty': `plate Number can not be empty`,
  'string.pattern.base': `plate Number should be a valid plate number with 6 or 7 digits`
}),
accountNumber: Joi.string()
  .min(10),
  insuranceExpiresOn: Joi.date()
    .min(Date.now())
    .required(),
  ownerContact:Joi.object({
  email: Joi.string(),
  phoneNumber:Joi.number(),

}),
});
export const UpdateVehicleValidator = Joi.object({
  vehicleType: Joi.string()
  .valid('Fuso', 'Lifan', 'Daihatsu', 'Trailer', 'Pickups', 'Motorcycle')
  .messages({
    'string.empty': 'Vehicle Name can not be empty',
    'any.only': "Vehicle Name should be one of 'Fuso', 'Lifan', 'Daihatsu', 'Trailer', 'Pickups', 'Motorcycle'"
  })
  ,
insurance: Joi.string()
  .min(3),
paymentMethod: Joi.string()
  .min(2)
  .lowercase(),
plateNumber: Joi.string()
.regex(/^[Rr][A-Za-z]{2}[0-9]{3}[A-Za-z]$/)
.messages({
  'string.empty': `plate Number can not be empty`,
  'string.pattern.base': `plate Number should be a valid plate number with 6 or 7 digits`
}),
accountNumber: Joi.string()
  .min(10),
  insuranceExpiresOn: Joi.date()
    .min(Date.now()),
  ownerContact:Joi.object({
  email: Joi.string(),
  phoneNumber:Joi.number(),

}),
});
