import Joi from '@hapi/joi';

export const CreateDepartmentValidation = Joi.object({
  title: Joi.string()
    .min(5)
    .required()
    .messages({
      'string.empty': `title field can not be empty`,
    }),
  description: Joi.string()
    .min(5),
  

});

export const UpdateDepartmentValidation = Joi.object({
  title: Joi.string()
    .min(5),
  description: Joi.string()
    .min(5),

});
