import { Args,Arg,Ctx, Mutation, Authorized, Query, Resolver, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs'
import { welcomeEmail,ResetPasswordLink } from '../../../models/welcome.email';

import {
  defaultCountryCode,
  ErrorResponse,
} from '../../helpers/users/users.helper';
import { generateToken } from '../../helpers/users/users.helper';

import {
  signInMiddl,
  signUpMiddl,
  verifyPhoneNumber,
  verifyEmail,
} from '../../middlewares/users.middleware';
import { SignInArgs, SignInWithPhoneArgs ,SignupArgs,RequestResetPasswordArgs,ResetPasswordArgs,ChangePassword,UpdateUserArgs,GetUsersArgs } from '../schemas/users/args';
import  {User, LoginPayload, SignupPayload,UserModel,UsersPayload } from '../schemas/users/users.schema';
import {createToken} from '../../../utils/auth'
import {sendEmail,sendEmailSendgrid} from '../../../utils/mail'

@Resolver()
export default class UserResolver {
  @Authorized("admin")
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
  @Authorized("admin", "operator")
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
  @Authorized("admin" )
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
  @Authorized( )
  @Mutation((returns) => String, { nullable: true })
 
  async DeleteMe(@Ctx() ctx: any) {
    try {
      const {email}=ctx.user
      console.log(email)
     const deleted= await  UserModel.deleteOne({
      email:email
      });
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting A user .' },
      });
    }
  }
  @Authorized("ADMIN", "MODERATOR")
  @Mutation((returns) => User, { nullable: true })
  async updateDriver(@Args() args: UpdateUserArgs) {
    let { userId,updates } = args;

    try{
    updates={...updates}
    const updatedUser = UserModel.findOneAndUpdate({_id:userId},updates,{new:true})
    
      return {  updatedUser};
    }catch(error){

return ErrorResponse({ errors: { error: error.message } });
    }  
  }
  
  @Mutation((returns) => String, { nullable: true })
  @UseMiddleware(verifyEmail, verifyPhoneNumber)
  async signup(@Args() args: SignupArgs) {
    const {email}=args
    
    try{
      const create = await new UserModel({
        ...args
      }).save();
    //  console.log(create)
      const token = await createToken(args)
      const verifyLink = `${process.env.FRONTEND_URL}/verify?email=${email}&token=${token}`
      
      await sendEmailSendgrid(email,'Welcome to Ironji',welcomeEmail(verifyLink),)
  
      return "Success User created Check your email to verify yuor account"
      
      
    }catch(error){
      console.log(error)
      return ErrorResponse({ errors: { error: "something went wrong while creating your account"} });
    }
    
  }
  @Mutation((returns) => LoginPayload, { nullable: true })

  async signinWithPhone(@Args() args: SignInWithPhoneArgs) {
    const { phone } = args;
    const userLogin = await UserModel.findOne({
       phoneNumber:phone
    });

    if (!userLogin) {
      const message =
        'Failed to login, check if provided information are correct';

      return ErrorResponse({ errors: { error: message } });
    }
    const { phoneNumber, firstName, lastName, avatar } = userLogin;
    const payload = { phoneNumber, firstName, lastName, avatar };
    const token = await generateToken(payload, '5h');

    return { token, user: userLogin };
  }
  @Mutation((returns) => LoginPayload, { nullable: true })
  
  async signin(@Args() args: SignInArgs){
    const { email,password} = args;
    const userLogin = await UserModel.findOne({
      email: email,
    });
 

    if (!userLogin) {
      const message =
        'Failed to login, check if provided information are correct';

      return ErrorResponse({ errors: { error: message } });
    }else if (!userLogin.verified){
      return ErrorResponse({ errors: { error: "your account is not verified "} });
    }
    else{
      const isValidPassword = await bcrypt.compare(password, userLogin.password)
      if (!isValidPassword) {
        return ErrorResponse({ errors: { error: "incorrect password"} });
      }
      const { phoneNumber,  email,userType} = userLogin;
      const payload = { phoneNumber,  email,userType };
      const token = generateToken(payload, '5h');
  
      return { token, user: userLogin };
    }
    
  }

  @Mutation((returns) => String, { nullable: true })
  async requestPasswordReset(@Args() args: RequestResetPasswordArgs){

    try{
      const { authtype,email,phone} = args;
      let user
       if (authtype=="phone"){
         user = await UserModel.findOne({
           phoneNumber:phone
         });
       }else{
         user = await UserModel.findOne({
           email:email
         });
       }
       if (!user) {
         const message =
         "Couldn't reset password try again";
   
         return ErrorResponse({ errors: { error: message } });
       }else if (!user.verified){
         return ErrorResponse({ errors: { error: "please verify your account first "} });
       }
       const { phoneNumber, firstName, lastName, userType} = user;
       const payload = { phoneNumber, firstName, lastName,userType };
       
         const token = await generateToken(payload, '5h');
       const tokenExpiry =new Date(Date.now() + 36000000) 
       
       await UserModel.findOneAndUpdate(
         { _id: user._id },
         { passwordResetToken: token, passwordResetTokenExpiry: tokenExpiry },
         { new: true }
       )
       
       const resetLink = `${process.env.FRONTEND_URL}/reset-password?email=${email}&token=${token}`
         await sendEmailSendgrid(email,'Ironji (Your Reset Password Request )',ResetPasswordLink(resetLink))
         return `A link to reset your password has been sent to ${user.email}`
       }
     catch(error){
      return ErrorResponse({ errors: { error} });
    
    }  
  }
  @Mutation((returns) => LoginPayload, { nullable: true })
  async resetPassword(@Args() args: ResetPasswordArgs){
    const { token,password} = args;
    
    const dateLimit=new Date (Date.now() - 36000000)
    const user = await UserModel.findOne({
      passwordResetToken: token,
      passwordResetTokenExpiry: {
        $gte: dateLimit,
      },
    })
   

    if (!user) {
      const message =
      'This token is either invalid or expired!.';
      return ErrorResponse({ errors: { error: message } });
    }else if (!user.verified){
      return ErrorResponse({ errors: { error: "please verify your email address "} });
    }
    else{
    user.passwordResetToken = '',
    user.passwordResetTokenExpiry = undefined,
    user.password = password
    await user.save()
  
      const { phoneNumber, email,userType} = user;
      const payload = { phoneNumber,  email,userType };
      const token = generateToken(payload, '5h');
  
      return { token, user: user };
    }
    
  }
}
