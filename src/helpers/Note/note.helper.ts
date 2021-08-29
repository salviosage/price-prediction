import Joi from '@hapi/joi';

export const CreateNoteValidator = Joi.object({

  title: Joi.string()
  .min(5).required(),
  type: Joi.string().valid('ChangeDropoff','DefaultNote','ChangeTime','Emergencies','DealDone','DealClosed','DealOpened')
  .messages({
    'any.only': "Note Type should be one of 'ChangeDropoff' 'DefaultNote' 'ChangeTime' 'Emergencies' 'DealDone' 'DealClosed' 'DealOpened'"
  }),
  description: Joi.string().required(),
  coverImage: Joi.string(),

});
export const UpdateNoteValidator = Joi.object({
  title: Joi.string()
  .min(5),
  type: Joi.string().valid('ChangeDropoff','DefaultNote','ChangeTime','Emergencies','DealDone','DealClosed','DealOpened')
  .messages({
    'any.only': "Note Type should be one of 'ChangeDropoff' 'DefaultNote' 'ChangeTime' 'Emergencies' 'DealDone' 'DealClosed' 'DealOpened'"
  }),
  description: Joi.string(),
  coverImage: Joi.string(),
  });