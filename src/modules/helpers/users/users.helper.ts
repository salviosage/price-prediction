import Joi from '@hapi/joi';
import Jwt from 'jsonwebtoken';
import { environment } from '../../../database/environment';
export const signupValidator = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  phoneNumber: Joi.string()
    .required()
    .min(9)
    .max(9),
  userType: Joi.string().required(),
});
export const signInValidator = Joi.object({
  phoneNumber: Joi.string()
    .min(9)
    .max(9)
    .required(),
});
export const ErrorResponse = ({ errors }: { errors: any }) => {
  const error = { errors };
  throw new Error(JSON.stringify(error));
};

export const defaultCountryCode = '+250';
export const generateToken = (payload: any, expiresIn: string) => {
  const token = Jwt.sign(payload, `${environment.IRONJI_SECRET_KEY}`, {
    expiresIn,
  });
console.log(token)
  return token;
};
