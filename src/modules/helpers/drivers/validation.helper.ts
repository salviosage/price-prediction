import Joi from '@hapi/joi';

export const DriverValidation = Joi.object({
  
  // nationalId: Joi.string()
  // .regex(/^[1-9][1-9]\d{3}[789]\d{10}$/)
  // .required()
  // .messages({
  //   'string.empty': `National ID can not be empty`,
  //   'string.pattern.base': `National ID should be a valid ID number with 16 digits`
  // }),
  drivingLicense: Joi.string()
  .min(2)
  .required(),
  vehicleType: Joi.string()
    .valid('Fuso', 'Lifan', 'Daihatsu', 'Trailer', 'Pickups', 'Motorcycle')
    .required()
    .messages({
      'string.empty': 'Vehicle Name can not be empty',
      'any.only': "Vehicle Name should be one of 'Fuso', 'Lifan', 'Daihatsu', 'Trailer', 'Pickups', 'Motorcycle'"
    })
    ,
  vehicleInsurance: Joi.string()
    .min(3)
    .required(),
  paymentMethod: Joi.string()
    .min(2)
    .required()
    .lowercase(),
  // plateNumber: Joi.string()
  // .regex(/^[Rr][A-Za-z]{2}[0-9]{3}[A-Za-z]$/)
  // .required()
  // .messages({
  //   'string.empty': `plate Number can not be empty`,
  //   'string.pattern.base': `plate Number should be a valid plate number with 6 or 7 digits`
  // }),
  accountNumber: Joi.string()
    .required()
    .min(10),
  availableTime: Joi.string()
    .valid('Mon - Sun', 'Mon - Fri', 'Mon - Thu, Sun', 'Mon - Sat')
    .required()
    .messages({
      'string.empty': 'Working Time can not be empty',
      'any.only': "Working Time should be one of 'Mon - Sun', 'Mon - Fri', 'Mon - Thu, Sun', 'Mon - Sat'"
    })
});
