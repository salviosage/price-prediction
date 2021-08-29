import { Resolver, Mutation,Query, Args,Arg,Authorized, UseMiddleware } from 'type-graphql';
import { Driver,DriverModel,CreateDriverResponse,DriversResponse } from '../schemas/drivers/driver.schema';
import {CreateDriverArgs,UpdateDriverAllArgs,DeleteDriver,GetDriversArgs, UpdateDriverArgs} from '../schemas/drivers/args'
// import { Driver } from '../../../database/models/driver.model';
import { ErrorResponse } from '../../helpers/users/users.helper';
import {
  verifyNationalId,
  // verifyPhoneNumber,
  verifyPlateNumber,
} from '../../middlewares/drivers/verify.middleware';
import {
  signInMiddl,
  signUpMiddl,
  verifyPhoneNumber,
  verifyEmail,
} from '../../middlewares/users.middleware';
import { validate } from '../../middlewares/drivers/validator.middleware';

@Resolver()
export default class DriverResolver {
  @Authorized(["admin", "super_admin"])
  @Query((returns) => DriversResponse, { nullable: true })
  
  async GetDrivers( @Args() {  skip, take }: GetDriversArgs) {
    try {
      const drivers =await  DriverModel.find({
    
      }).skip(skip).limit(take);
      
      
      const count =await  DriverModel.countDocuments({
      
      }).skip(skip).limit(take);
    
      return {
        drivers,
        count,
      };
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while finsing drivers.' },
      });
    }
  }
  @Authorized(["admin", "super_admin"])
  @Query((returns) => Driver, { nullable: true })
 
  async GetOneDriver(@Arg("_id") _id: string) {
    try {
      
      const driver = await  DriverModel.findById({
      _id
      });
      if (driver === undefined) {
        return ErrorResponse({
          errors: { error: 'driver not found .' },
        });
      }
      return driver
      
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching driver .' },
      });
    }
  }
  @Authorized(["admin", "super_admin","driver"])
  @Mutation((returns) => String, { nullable: true })
 
  async DeleteDriver(@Arg("_id") _id: string) {
    try {
      
      await  DriverModel.deleteOne({
      _id
      });
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting A driver .' },
      });
    }
  }
  @Authorized(["admin", "super_admin","driver"])
  @Mutation((returns) => Driver, { nullable: true })
  async updateDriver(@Args() args: UpdateDriverAllArgs) {
    let { driverId,updates } = args;

    try{
    updates={...updates}
    const updatedDriver = DriverModel.findOneAndUpdate({_id:driverId},updates,{new:true})
    
      return {  updatedDriver};
    }catch(error){

return ErrorResponse({ errors: { error: error.message } });
    }  
  }

  @Authorized(["admin", "super_admin","driver"])
  @Mutation((returns) => CreateDriverResponse, { nullable: true })
  @UseMiddleware(
    validate,
    // verifyPhoneNumber,
    verifyNationalId,
    verifyPlateNumber,
  )
  async CreateDriver(@Args() args: CreateDriverArgs) {
    try {
      const { insuranceExpiresOn } = args;
      const driver= await new DriverModel({
        ...args,
        insuranceExpiresOn: new Date(insuranceExpiresOn),
      }).save();
      return {
        message: 'your account has been created successfully.',
        
      };
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while creating an account.' },
      });
    }
  }
}
