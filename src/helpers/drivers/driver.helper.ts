import Joi from '@hapi/joi';

export const DriverValidation = Joi.object({
  work_phone_number:Joi.string()
  .regex(/^07[823]\d{7}$/)
  .required()
  .messages({
  'string.empty': `Phone Number can not be empty`,
  'string.pattern.base': `Phone Number should be a valid mobile number with 10 digits`
  }),

passport: Joi.string().max(30),
national_id: Joi.string().max(30),
documents: Joi.array().items(Joi.object({
  documentId: Joi.string().max(30),
  url: Joi.string().max(30),
  type: Joi.string().max(30),
  verified: Joi.boolean(),
})),
driving_permit: Joi.string().required(),
truck_plate_number: Joi.string().required(),
truck_insurance: Joi.string().required(),
carte_jaune: Joi.string().required(),
verified: Joi.boolean(),

working_regions: Joi.array().items(Joi.object({
  type: Joi.string().max(30),
  coordinates: Joi.array().items(Joi.number()).required(),
  locationName: Joi.string().max(30),
})),
    
});

export const UpdateDriverValidation = Joi.object({
  work_phone_number:Joi.string()
  .regex(/^07[823]\d{7}$/),

passport: Joi.string().max(30),
national_id: Joi.string().max(30),
documents: Joi.array().items(Joi.object({
  documentId: Joi.string().max(30),
  url: Joi.string().max(30),
  type: Joi.string().max(30),
  verified: Joi.boolean(),
})),
driving_permit: Joi.string(),
truck_plate_number: Joi.string(),
truck_insurance: Joi.string(),
carte_jaune: Joi.string(),
verified: Joi.boolean(),

working_regions: Joi.array().items(Joi.object({
  type: Joi.string().max(30),
  coordinates: Joi.array().items(Joi.number()).required(),
  locationName: Joi.string().max(30),
})),
    
});