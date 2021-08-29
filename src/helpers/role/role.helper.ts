import Joi from '@hapi/joi';

export const CreateRoleValidation = Joi.object({
  title: Joi.string()
    .min(5)
    .required()
    .messages({
      'string.empty': `title field can not be empty`,
    }),
  description: Joi.string().min(5),
  privilegeLevel: Joi.number().min(0).max(10).required()


});

export const UpdateRoleValidation = Joi.object({
  title: Joi.string()
    .min(5),
  description: Joi.string()
    .min(5),
  privilegeLevel: Joi.number().min(0).max(10)

});
