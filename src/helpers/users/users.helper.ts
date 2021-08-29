import Joi from '@hapi/joi';
import Jwt from 'jsonwebtoken';
import { environment } from '../../database/environment';
export const signupValidator = Joi.object({

 documents: Joi.array().items(Joi.object({
    documentId: Joi.string().max(30),
    url: Joi.string().max(30),
    type: Joi.string().max(30),
    verified:Joi.boolean(),
})) ,
 
  verified:Joi.boolean(),
  first_name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  other_names: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    phone_number: Joi.string()
    .regex(/^07[823]\d{7}$/).required(),
  user_type: Joi.string(),

  email: Joi.string()
    .max(30)
    .required(),
    avatar: Joi.string()
    .max(100),
    password: Joi.string()
    .max(100),
});
export const UpdateMeValidator = Joi.object({
  documents: Joi.array().items(Joi.object({
    documentId: Joi.string().max(30),
    url: Joi.string().max(30),
    type: Joi.string().max(30),
    verified:Joi.boolean(),
})) ,
 
  verified:Joi.boolean(),
  first_name: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  other_names: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
    phone_number: Joi.string()
    .regex(/^07[823]\d{7}$/),
  user_type: Joi.string(),

  email: Joi.string()
    .max(30),
    avatar: Joi.string()
    .max(100),
    password: Joi.string()
    .max(100),
});
export const signWithPhoneInValidator = Joi.object({
  phone_number: Joi.string()
  .regex(/^07[823]\d{7}$/)
  .required()
});
export const signInValidator = Joi.object({
  email: Joi.string()
    .max(30)
    .required(),
    password: Joi.string()
    .max(30)
    .required(),
});

