import { Args,Arg, Mutation,Authorized, Query,Ctx, Resolver, UseMiddleware } from 'type-graphql';
import UserModel from '../database/models/User';
import bcrypt from 'bcryptjs'
import {
  defaultCountryCode,
  ErrorResponse,generateToken 
} from '../helpers/common.helper';

import {
  signInMiddl,
  signUpMiddl,
  signInWithPhoneMiddl,
  verifyPhoneNumber,
  verifyUserType,
  updateUserMiddl
} from '../middlewares/user/users.middleware';
import { SignInWithEmailArgs,SignInWithPhoneArgs, SignupArgs,GetUsersArgs,UpdateUserArgs,UpdateMeArgs,ResetPasswordArgs } from '../schemas/users/args';
import User, { UserSignup,UserLogin,UsersPayload } from '../schemas/users';
import OptGemerator from '../utils/otp.generator'
import sendSMS from '../utils/twilioSms'
import {SendEmail} from '../utils/sendEmail'
import {WelcomeEmail} from '../template/emailGen'

@Resolver()
export default class UserResolver {
  @Authorized("ADMIN,OPERATOR")
  @Query((returns) => UsersPayload, { nullable: true })
  
  async GetUsers( @Args() {  skip, take }: GetUsersArgs) {
    try {
      const users =await  UserModel.find({
    
      }).skip(skip).limit(take);
      
      
      const count =await  UserModel.countDocuments({
      
      }).skip(skip).limit(take);
    
      return {
        users,
        count,
      };
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching users.' },
      });
    }
  }
  @Authorized("ADMIN,OPERATOR")
  @Query((returns) =>User, { nullable: true })
 
  async GetOneUser(@Arg("_id") _id: string) {
    try {
      
      const user = await  UserModel.findById({
      _id
      });
      if (user === undefined) {
        return ErrorResponse({
          errors: { error: 'user not found .' },
        });
      }
      return user
      
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching user .' },
      });
    }
  }
  @Authorized("ADMIN,OPERATOR")
  @Mutation((returns) => UserSignup, { nullable: true })
  @UseMiddleware(signUpMiddl, verifyUserType, verifyPhoneNumber)
  async signUpUser(@Args() args: SignupArgs) {
    try{
     const {userInfo}=args
      if (userInfo.phone_number){
        userInfo.phone_number= `${defaultCountryCode}${userInfo.phone_number}`
      }
      const otp =  await OptGemerator()
      const user = await new UserModel({
        otp,
        temporal_otp:otp,
        ...userInfo
      }).save();
      const genHtml=WelcomeEmail({otp,username:user.first_name})
      const mailOptions = {
        to: user.email,
        subject: 'Welcome to Jamii!',
        html: genHtml,
      }
      await SendEmail(user.email,'Welcome to Ironji!',genHtml)
      await sendSMS(`+${user.phone_number}`,`your Ironji OTP is ${otp}`);
  
      return "Your Ironji Account is created sucessfully";
    }catch(error){
      return ErrorResponse({ errors: { error: error.message } });
    }
   
  }

  @Authorized("ADMIN","OPERATOR")
  @Mutation((returns) => User, { nullable: true })
  @UseMiddleware(updateUserMiddl)
  async updateUser(@Args() args: UpdateUserArgs,@Ctx() ctx: any) {
    try{
      let {id, updates:{user_type}}=args

    
    const updatedUser = await UserModel.findOneAndUpdate({id:id},
      {user_type},
      {new:true})
    return updatedUser;
      }catch(error){
  
  return ErrorResponse({ errors: { error: error.message } });
      } 
    
  }
  @Authorized("ADMIN" )
  @Mutation((returns) => String, { nullable: true })
 
  async DeleteUser(@Arg("_id") _id: string) {
    try {
      
      await  UserModel.findOneAndDelete({
      _id
      });
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting A user .' },
      });
    }
  }
  @Mutation((returns) => User, { nullable: true })
  async resetPassword(@Args() args: ResetPasswordArgs) {
    try{
      const { password,passwordResetToken} = args;

      // check token 
      const create = await UserModel.updateOne({password},{password});
  
      return create;
    }catch(error){
      return ErrorResponse({ errors: { error: error.message } });
    }
    
  }
  @Query((returns) => UserLogin, { nullable: true })
  @UseMiddleware(signInWithPhoneMiddl)
  async signinWithPhone(@Args() args: SignInWithPhoneArgs): Promise<UserLogin|any> {
    try{
      const { phone_number } = args;
      
      const userLogin = await UserModel.findOne({
        phone_number: `${defaultCountryCode}${phone_number}`,
      });
  
      if (!userLogin) {
        const message =
          'Failed to login, check if provided information are correct';
  
        return ErrorResponse({ errors: { error: message } });
      }
      const {  first_name,email, other_names, avatar } = userLogin;
      const payload = { phone_number,email, first_name, other_names, avatar };
      const token = generateToken(payload, '5h');
  
      return { token, user: userLogin };
    }catch(error){
      return ErrorResponse({ errors: { error: error.message } });
    }
    
  }

  @Query((returns) => UserLogin, { nullable: true })
  @UseMiddleware(signInMiddl)
  async signInUser(@Args() args: SignInWithEmailArgs): Promise<UserLogin|any> {
    try{
      const {password}=args
      const user = await UserModel.findOne({ email:args.email })
   
      if (!user) {
        const message =
        'Failed to login, check if provided information are correct';
  
      return ErrorResponse({ errors: { error: message } });
    }
  
      if (!user.verified) {
        return ErrorResponse({ errors: { error: 'Verification link has been sent to your Email Please Verify Your Account First'} });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return ErrorResponse({ errors: { error: 'Invalid password'} })
      }
      const { phone_number, first_name,user_type, other_names,email , avatar } = user;
      const payload = {phone_number, first_name,user_type, other_names,email, avatar};
      const token = generateToken(payload, '5h');
  
      return { token, user: user };
    }catch(error){
      return ErrorResponse({ errors: { error: error.message } });
    }
  
  }
}
