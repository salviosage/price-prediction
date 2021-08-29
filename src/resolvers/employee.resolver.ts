import { Args, Arg, Mutation, Authorized, Query, Ctx, Resolver, UseMiddleware } from 'type-graphql';
import UserModel from '../database/models/User';
import EmployeeModel from '../database/models/Employee';
import bcrypt from 'bcryptjs'
import {
  defaultCountryCode,
  ErrorResponse,
  generateToken
} from '../helpers/common.helper';
import { SignInWithEmailArgs, GetUsersArgs } from '../schemas/users/args';
import Employee, { EmployeeLogin, EmployeesPayload } from '../schemas/employee';
import { EmployeeArgs, UpdateemployeeArgs } from '../schemas/employee/args';
import {
  VerifyEmail,
  VerifyPhoneNumber
} from '../middlewares/common.middleware';
import { UserSignup } from '../schemas/users';
import { CreateEV, UpdateEV } from '../middlewares/employee.middleware';
import { CreateUIV, UpdateUIV, LoginU } from '../middlewares/user.middleware';
import OptGemerator from '../utils/otp.generator'
import sendSMS from '../utils/twilioSms'
import { SendEmail } from '../utils/sendEmail'
import { WelcomeEmail } from '../template/emailGen'

@Resolver()
export default class EmployeeResolver {
  @Authorized("ADMIN")
  @Query((returns) => EmployeesPayload, { nullable: true })
  async GetEmployees(@Args() {  skip, take }: GetUsersArgs) {
    try {
      const employees = await EmployeeModel.find({}).populate('user').skip(skip).limit(take);
      const count = await EmployeeModel.countDocuments({}).skip(skip).limit(take);
      return {
        employees,
        count,
      };
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching Employees.' },
      });
    }
  }

  @Authorized("ADMIN", "OPERATOR")
  @Query((returns) => Employee)
  async GetOneEmployee(@Arg("_id") _id: string) {
    try {

      const employee = await EmployeeModel.findById({ _id }).populate('user');
      if (!employee) { return ErrorResponse({ errors: { error: 'Emplyee not found .' }, }); }
      return employee
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching user .' },
      });
    }
  }


  @Mutation((returns) => UserSignup, { nullable: true })
  @UseMiddleware(CreateUIV,CreateEV, VerifyEmail, VerifyPhoneNumber)
  async signUpEmployee(@Args() args: EmployeeArgs) {
    try{
        const {userInfo,...employeeInfo}=args
      userInfo.phone_number= `${defaultCountryCode}${userInfo.phone_number}`;
      if(employeeInfo.work_phone_number){
        employeeInfo.work_phone_number= `${defaultCountryCode}${employeeInfo.work_phone_number}`;
      }
      const otp =  await OptGemerator()
      const user = await new UserModel({
        otp,
        temporal_otp:otp,
        updatedAt: new Date(),
        ...userInfo
      }).save();
      const driver = await new EmployeeModel({
          user:user.id,
        ...employeeInfo
      }).save();
      const genHtml=WelcomeEmail({otp,username:user.first_name})

      await SendEmail(user.email,'Welcome to Ironji!',genHtml)
      await sendSMS(`+${user.phone_number}`,`your Ironji OTP is ${otp}`);
      return {message:"Account Created Successfully"};
    
  
    }catch(error){
     console.log(error)
      return ErrorResponse({ errors: "Something went wrong" });
    }
   
  }
  @Authorized("EMPLOYEE")
  @Mutation((returns) => Employee, { nullable: true })
  @UseMiddleware(UpdateUIV, UpdateEV)
  async updateEmpoyee(@Args() args: UpdateemployeeArgs, @Ctx() ctx: any) {
    try {
      const { updates: { userInfo, ...employeeInfo } } = args
      const { email, id } = ctx.user
      if (userInfo.phone_number) {
        userInfo.phone_number = `${defaultCountryCode}${userInfo.phone_number}`
      }
      if (employeeInfo.work_phone_number) {
        employeeInfo.work_phone_number = `${defaultCountryCode}${employeeInfo.work_phone_number}`
      }
      await UserModel.findOneAndUpdate({ email: email }, { userInfo })
      const employee = await EmployeeModel.findOneAndUpdate({ user: id }, { employeeInfo }, { new: true }).populate('user');
      return employee;
    } catch (error) {

      return ErrorResponse({ errors: { error: error.message } });
    }

  }

  @Query((returns) => EmployeeLogin, { nullable: true })
  @UseMiddleware(LoginU)
  async signInEmployee(@Args() args: SignInWithEmailArgs) {
    try {
const {email,password}=args
      const user = await UserModel.findOne({ email})

      if (!user) {
        const message =
          'Failed to login, check if provided information are correct';

        return ErrorResponse({ errors: { error: message } });
      }

      if (!user.email_verified) {
        return ErrorResponse({ errors: { error: 'Verification link has been sent to your Email Please Verify Your Account First' } });
      }

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return ErrorResponse({ errors: { error: 'Invalid password' } })
      }
      const employee = await EmployeeModel.findOne({ user: user.id })
      const {  user_type,id} = user;
      const payload = {   user_type, email,id };
      const token = generateToken(payload, '5h');

      return { token, user:employee };
    } catch (error) {
      return ErrorResponse({ errors: { error: error.message } });
    }

  }
}
