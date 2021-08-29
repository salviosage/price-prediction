
import Driver, { DriverWithMessage,DriversPayload,DriverLogin } from '../schemas/drivers';
import DriverModel   from '../database/models/Driver';
import bcrypt from 'bcryptjs'
import { Args,Arg, Mutation,Authorized, Query,Ctx, Resolver, UseMiddleware } from 'type-graphql';
import {
  defaultCountryCode,
  ErrorResponse,generateToken ,generateMFAToken,generateSignupOTPAndToken 
} from '../helpers/common.helper';
import { UpdateDriverArgs, DriverArgs} from '../schemas/drivers/args';
import { SignInWithEmailArgs,SignInWithPhoneArgs, SignupArgs,GetUsersArgs,UpdateUserArgs,UpdateMeArgs } from '../schemas/users/args';
import OptGemerator from '../utils/otp.generator'
import sendSMS from '../utils/twilioSms'
import UserModel from '../database/models/User'
import {
    verifyVerifiedUser,
    verifyExpiredResetPasswordOtp,
    verifyExpiredOtp,
    VerifyEmail,
    VerifyPhoneNumber
  } from '../middlewares/common.middleware';
  import {CreateDV,UpdateDV} from '../middlewares/driver.middleware';
  import { UserLogin,UserSignup} from '../schemas/users';
  import {CreateUIV,UpdateUIV,LoginWPU,LoginU} from '../middlewares/user.middleware';
  import {SendEmail} from '../utils/sendEmail'
  import {WelcomeEmail} from '../template/emailGen'

@Resolver()
export default class DriverResolver {

  @Authorized()
  @Query((returns) => Driver, { nullable: true })
  async GetAuthDriver(@Ctx() ctx: any) {
      const {id}=ctx.authUser
    try{
    const driver= await (await DriverModel.findOne({id})).populate('user')
    return driver;
      }catch(error){
  
  return ErrorResponse({ errors: { error: error.message } });
      } 
  }
  @Authorized()
  @Query((returns) => DriversPayload, { nullable: true })
  
  async GetDrivers( @Args() {  skip, take }: GetUsersArgs) {
    try {
      const drivers =await  DriverModel.find({
      }).populate('user').skip(skip).limit(take);
      const count =await  DriverModel.countDocuments({
      }).skip(skip).limit(take);
    
      return {
        drivers,
        count,
      };
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching users.' },
      });
    }
  }
  @Authorized()
  @Query((returns) =>Driver, { nullable: true })
 
  async GetOneDriver(@Arg("_id") _id: string) {
    try {
      
      const driver = await  DriverModel .findById({
      _id
      });
      if (!driver) {
        return ErrorResponse({ errors: "driver not found ." });
        
      }
      return driver
      
    } catch (error) {
     
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching user .' },
      });
    }
  }
  @Mutation((returns) => UserSignup, { nullable: true })
  @UseMiddleware(CreateUIV,CreateDV,VerifyEmail,VerifyPhoneNumber)
  async signUpDriver(@Args() args: DriverArgs) {
    try{
        const {userInfo,...driverInfo}=args
      userInfo.phone_number= `${defaultCountryCode}${userInfo.phone_number}`;
      if(driverInfo.work_phone_number){
        driverInfo.work_phone_number= `${defaultCountryCode}${driverInfo.work_phone_number}`;
      }
      const otp =  await OptGemerator()
      const user = await new UserModel({
        otp,
        temporal_otp:otp,
        user_type:'DRIVER',
        updatedAt: new Date(),
        ...userInfo
      }).save();
      const driver = await new DriverModel({
          user:user.id,
         
        ...driverInfo
      }).save();

      await generateSignupOTPAndToken (user.email,user.first_name,user.phone_number)
      return {message:"Account Created Successfully"};
    
  
    }catch(error){
     console.log(error)
      return ErrorResponse({ errors: "Something went wrong" });
    }
   
  }
  // @Authorized("Driver")
  @Mutation((returns) => Driver, { nullable: true })
  @UseMiddleware(UpdateUIV,UpdateDV)
  async updateDriver(@Args() args: UpdateDriverArgs,@Ctx() ctx: any) {
    try{
      const {userInfo,...driverInfo}=args
      const {id}=ctx.user
     let  driverU, userU,driver=null;
  if(userInfo){
    userU = {...userInfo, updatedAt: new Date()};
    await UserModel.findOneAndUpdate({id},  userU,)
  }
  
  if(driverInfo){
    driverU={...driverInfo, updatedAt: new Date()}
    driver = await DriverModel.findOneAndUpdate({user:id},
        driverU,
        {new:true})
  }
      return {driver};
      }catch(error){
  
  return ErrorResponse({ errors: { error: error.message } });
      } 
  }

  // @Authorized("admin" )
  @Mutation((returns) => String, { nullable: true })
 
  async DeleteDriver(@Arg("_id") _id: string) {
    try {
      
      await  DriverModel .findOneAndDelete({
      _id
      });
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting A user .' },
      });
    }
  }
  @Query((returns) => DriverLogin, { nullable: true })
  @UseMiddleware(LoginU)
  async signInDriver(@Args() args: SignInWithEmailArgs) {
    try{
      const { password ,email} = args;
      const user = await  UserModel.findOne({ email:args.email,user_type:"DRIVER"})
   
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
      const { phone_number, first_name,user_type, other_names , avatar } = user;
      const payload = {phone_number, first_name,user_type, other_names,email, avatar};
      const token = generateToken(payload, '5h');
      const driver= await  DriverModel.findOne({ user:user.id}).populate('user')
      if (!driver) {
        const message =
        'Client not found ';
  
      return ErrorResponse({ errors: { error: message } });
    }
      return { token, driver};
    }catch(error){
      return ErrorResponse({ errors: { error: error.message } });
    }
    
  }
  @Query((returns) => DriverLogin, { nullable: true })
  @UseMiddleware(LoginWPU)
  async signInWPDriver(@Args() args: SignInWithPhoneArgs) {
    try{
      const { phone_number } = args;
      
      const driver = await UserModel.findOne({
        phone_number
      });
  
      if (!driver) {
        const message =
          'Failed to login, check if provided information are correct';
          return ErrorResponse({ errors: { error: message } });}

      const token  = generateMFAToken(driver.email,phone_number, '5h');
      return {driver:"MFA OTP have been sent to your Email adress ",token};
    }catch(error){
      return ErrorResponse({ errors: { error: error.message } });
    }
    
  }

}

