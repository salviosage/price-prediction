import { Args,Arg, Mutation,Authorized, Query,Ctx, Resolver, UseMiddleware } from 'type-graphql';
import UserModel from '../database/models/User';
import ClientModel from '../database/models/Client';
import bcrypt from 'bcryptjs'
import {
  defaultCountryCode,
  ErrorResponse,generateToken ,generateMFAToken,generateSignupOTPAndToken
} from '../helpers/common.helper';
import {
  verifyVerifiedUser,
  verifyExpiredResetPasswordOtp,
  verifyExpiredOtp,
  VerifyEmail,
  VerifyPhoneNumber
} from '../middlewares/common.middleware';
import {CreateCV,UpdateCV} from '../middlewares/client.middleware';
import {CreateUIV,UpdateUIV,LoginWPU,LoginU} from '../middlewares/user.middleware';
import { UserLogin} from '../schemas/users';
import { SignInWithEmailArgs,SignInWithPhoneArgs, SignupArgs,GetUsersArgs,UpdateUserArgs,UpdateMeArgs } from '../schemas/users/args';
import Client, { ClientLogin,ClientSignup,ClientsPayload } from '../schemas/client';
import {ClientSignupArgs ,UpdateClientArgs} from '../schemas/client/args'
import OptGemerator from '../utils/otp.generator'
import sendSMS from '../utils/twilioSms'
import {SendEmail} from '../utils/sendEmail'
import {WelcomeEmail} from '../template/emailGen'


@Resolver()
export default class ClientResolver {
  @Authorized("admin")
  @Query((returns) => ClientsPayload, { nullable: true })
  
  async GetClients( @Args() {  skip, take }: GetUsersArgs) {
    try {
      const clients =await  ClientModel.find({
    
      }).skip(skip).limit(take);
      
      
      const count =await  ClientModel.countDocuments({
      
      }).skip(skip).limit(take);
    
      return {
        clients,
        count,
      };
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching Clients.' },
      });
    }
  }
  @Authorized("admin", "operator")
  @Query((returns) =>Client, { nullable: true })
 
  async GetOneCleint(@Arg("_id") _id: string) {
    try {
      
      const client = await  ClientModel.findById({
      _id
      }).populate("user");
      if (client === undefined) {
        return ErrorResponse({
          errors: { error: 'user not found .' },
        });
      }
      return client
      
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching user .' },
      });
    }
  }
  @Mutation((returns) => ClientSignup, { nullable: true })
  @UseMiddleware(CreateUIV,CreateCV, VerifyEmail, VerifyPhoneNumber)
  async signUpClient(@Args() args: ClientSignupArgs) {
    try{
      const { userInfo, ...clientInfo } = args;
      const otp =  await OptGemerator()
      userInfo.phone_number= `${defaultCountryCode}${userInfo.phone_number}`;
      const user = await new UserModel({
        otp,
        temporal_otp:otp,
        user_type:"CLIENT",
        ...userInfo
      }).save();
      const client= await new ClientModel({
        user: user.id,
        ...clientInfo
      }).save();
      const genHtml=WelcomeEmail({otp,username:user.first_name})
      const mailOptions = {
        to: user.email,
        subject: 'Welcome to Jamii!',
        html: genHtml,
      }
      await generateSignupOTPAndToken (user.email,user.first_name,user.phone_number)
      return {message:"Your Ironji Account is created sucessfully"};
    }catch(error){
      return ErrorResponse({ errors: { error: error.message } });
    }
   
  }
  @Authorized()
  @Mutation((returns) => Client, { nullable: true })
  @UseMiddleware(UpdateUIV,UpdateCV)
  async updateClient(@Args() args: UpdateClientArgs,@Ctx() ctx: any) {
    try{
      const {updates:{userInfo,...clientUpdate}}=args
      const {email}=ctx.user
    let phone_number
    if(userInfo.phone_number){
      userInfo.phone_number=`${defaultCountryCode}${userInfo.phone_number}`
    }
   const updatedUser= await UserModel.findOneAndUpdate({email}, userInfo)
   if(updatedUser){
    const updatedClient = await ClientModel.findOneAndUpdate({user:updatedUser.id},
        {clientUpdate},
        {new:true})
     return updatedClient;
   }
    
      }catch(error){
  
  return ErrorResponse({ errors: { error: error.message } });
      } 
    
  }

  @Authorized("admin" )
  @Mutation((returns) => String, { nullable: true })
 
  async DeleteClient(@Arg("_id") _id: string) {
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
  
  @Query((returns) => ClientLogin, { nullable: true })
  @UseMiddleware(LoginWPU)
  async signInClientWithPhone(@Args() args: SignInWithPhoneArgs): Promise<UserLogin|any> {
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
      const { first_name,email, other_names, avatar } = userLogin;
      const payload = { phone_number,email, first_name, other_names, avatar };
      const token = generateToken(payload, '5h');
  
      return { token, user: userLogin };
    }catch(error){
      return ErrorResponse({ errors: { error: error.message } });
    }
    
  }

  @Query((returns) => ClientLogin, { nullable: true })
  @UseMiddleware(LoginU)
  async signInClient(@Args() args: SignInWithEmailArgs): Promise<UserLogin|any> {
    try{
      const { password } = args;
      const user = await  UserModel.findOne({ email:args.email}).populate('user')
   
      if (!user) {
        const message =
        'Failed to login, check if provided information are correct';
  
      return ErrorResponse({ errors: { error: message } });
    }
  
      if (!user.email_verified) {
        return ErrorResponse({ errors: { error: 'Verification link has been sent to your Email Please Verify Your Account First'} });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return ErrorResponse({ errors: { error: 'Invalid password'} })
      }
      const { phone_number, first_name,user_type, other_names,email , avatar } = user;
      const payload = {phone_number, first_name,user_type, other_names,email, avatar};
      const token = generateToken(payload, '5h');
      const client= await  ClientModel.findOne({ user:user.id}).populate('user')
      return { token, client};
    }catch(error){
      return ErrorResponse({ errors: { error: error.message } });
    }
  
  }
}
