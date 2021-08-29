
import Jwt from 'jsonwebtoken';
import { environment } from '../database/environment';
import UserModel from '../database/models/User'
import OptGemerator from '../utils/otp.generator'
import sendSMS from '../utils/twilioSms'
import {SendEmail} from '../utils/sendEmail'
import {WelcomeEmail,MFAEmail} from '../template/emailGen'

export const ErrorResponse = ({ errors }: { errors: any }) => {
    throw new Error(JSON.stringify(errors));
  };
  
  export const defaultCountryCode = '+25';
  export const generateToken = (payload: any, expiresIn: string) => {
    const token = Jwt.sign(payload, `${environment.IRONJI_SECRET_KEY}`, {
      expiresIn,
    });
  
    return token;
  };

  export const generateMFAToken = async (email: string,phone_number:string|any, expiresIn: string) => {
  
      const otp =  await OptGemerator()
      const user = await  UserModel.findOneAndUpdate({ email},{
        mfa_otp: otp,
        mfa_otp_expiry:new Date( Date.now() + 60000*10),
      })
      const genHtml=MFAEmail({otp,username:user.first_name})
      await SendEmail(email,'Welcome to Ironji!',genHtml)
      await sendSMS(`+${phone_number}`,`your Ironji MFA OTP is ${otp}`);
   
    
      const token = Jwt.sign({email,phone_number}, `${environment.IRONJI_SECRET_KEY}`, {
        expiresIn,
      });
    
      return token;
   
  };

  export const generateSignupOTPAndToken = async (email: string,username:string,phone_number:string|any) => {
  
    const otp =  await OptGemerator()

    const genHtml=WelcomeEmail({otp,username})
    await SendEmail(email,'Welcome to Ironji!',genHtml)
    await sendSMS(`+${phone_number}`,`your Ironji OTP is ${otp}`);
    return {message:"Account Created Successfully"};
 return true 
 
};