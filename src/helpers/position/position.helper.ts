import Joi from '@hapi/joi';

export const CreatePositionValidation = Joi.object({
  title: Joi.string()
    .min(2)
    .required()
    .messages({
      'string.empty': `title field can not be empty`,
    }),
  description: Joi.string()
    .min(2),
  department: Joi.string()
    .required()
    .messages({
      'string.empty': `department field can not be empty`,
    }),

});

export const UpdatePositionValidation = Joi.object({
  title: Joi.string()
    .min(2)
    .messages({
      'string.empty': `title field can not be empty`,
    }),
  description: Joi.string()
    .min(2),
  department: Joi.string()
    .messages({
      'string.empty': `department field can not be empty`,
    }),

});
