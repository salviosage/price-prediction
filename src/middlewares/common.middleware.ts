
import { MiddlewareFn } from 'type-graphql';
import User  from '../database/models/User';
import { ErrorResponse } from '../helpers/common.helper';
import bcrypt from 'bcryptjs'

export const VerifyPhoneNumber: MiddlewareFn = async ({ args }, next) => {
  const { userInfo:{phone_number},...others} = args;
  const verify = await User.findOne({
    phone_number,
  });
  if (verify) {
    return ErrorResponse({ errors: 'phone number already exist.'  });
  }
  return next();
};
export const VerifyEmail: MiddlewareFn = async ({ args }, next) => {
    const { userInfo:{email},...others} = args;
    const verify = await User.findOne({
      email,
    });
    if (verify) {
      return ErrorResponse({ errors: 'account already exist.'  });
    }
    return next();
  };

export const verifyVerifiedUser: MiddlewareFn = async ({ args }, next) => {
  const { email,otp} = args;
  const verify = await User.findOne({
    email,verified:true,
  });
  if (verify) {
      let comp
    const {account_otp,reset_password_otp}=verify
     comp =bcrypt.compareSync(otp,account_otp)
    if (comp ) return ErrorResponse({ errors: 'OTP already verified'  }); 
    else if (bcrypt.compareSync(otp,account_otp)) return ErrorResponse({ errors: 'OTP already verified'  }); 
  }
  return next();
};

export const verifyExpiredOtp: MiddlewareFn = async ({ args }, next) => {
  const { phone_number,otp} = args;
  const verify = await User.findOne({
    phone_number:phone_number
  });
  
  if (verify) {
    const {account_otp_expirity}=verify 
    var MinutesAgo = new Date( Date.now() - 60000*10);
    if (account_otp_expirity < MinutesAgo){
        return ErrorResponse({ errors: 'OTP Expired'  });
    }
    
  }
  return next();
};
export const verifyExpiredResetPasswordOtp: MiddlewareFn = async ({ args }, next) => {
    const { phoneNumber,otp} = args;
    const verify = await User.findOne({
      phone_number:phoneNumber
    });
    
    if (verify) {
      const {reset_password_otp_expirity}=verify 
      var MinutesAgo = new Date( Date.now() - 60000*10);
      if (reset_password_otp_expirity < MinutesAgo){
          return ErrorResponse({ errors: 'OTP Expired'  });
      }
      
    }
    return next();
  };