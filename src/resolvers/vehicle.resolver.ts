
import VehicleModel   from '../database/models/Vehicle';
import { Args,Arg, Mutation,Authorized, Query,Ctx, Resolver, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs'
import {
  defaultCountryCode,
  ErrorResponse,
} from '../helpers/common.helper';

import { AddVehicleArgs,GetVehiclesArgs,UpdateVehicleArgs} from '../schemas/vehicle/args';
import Vehicle,{VehiclesPayload}  from '../schemas/vehicle';
import {
  verifyPlateNumber,
  verifyInsurance,
  createVehicleMiddl,
  updateVehicleMiddl,
  
} from '../middlewares/vehicles/vehicle.middleware';

@Resolver()
export default class VehicleResolver {
  
  @Authorized("admin")
  @Query((returns) => VehiclesPayload, { nullable: true })
  
  async GetVehicles( @Args() {  skip, take }: GetVehiclesArgs) {
    try {
      const users =await  VehicleModel .find({
    
      }).skip(skip).limit(take);
      
      
      const count =await  VehicleModel.countDocuments({
      
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
  @Query((returns) =>Vehicle, { nullable: true })
 
  async GetOneVehicle(@Arg("_id") _id: string) {
    try {
      
      const user = await  VehicleModel.findById({
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
  @Authorized()
  @Mutation((returns) => Vehicle, { nullable: true })
  @UseMiddleware(createVehicleMiddl,verifyInsurance, verifyPlateNumber)
  async addVehicle(@Args() args: AddVehicleArgs) {
    try{
      const {  phoneNumber } = args;
      const create = await new VehicleModel ({
        ...args,
        phoneNumber: `${defaultCountryCode}${phoneNumber}`,
        
      }).save();
  
      return create;
    }catch(error){
      return ErrorResponse({ errors: { error: error.message } });
    }
   
  }
 
  @Authorized("admin")
  @Mutation((returns) => Vehicle, { nullable: true })
  @UseMiddleware(updateVehicleMiddl)
  async updateVehicle(@Args() args: UpdateVehicleArgs,@Ctx() ctx: any) {
    try{
      let {id, updates}=args
    let phoneNumber,input 
    if(updates.phoneNumber){
      phoneNumber=`${defaultCountryCode}${updates.phoneNumber}`,
      input = {...updates,phoneNumber }
    }
    
  
    const updatedVehicle = await VehicleModel.findOneAndUpdate({id:id},
      {input},
      {new:true})
    return updatedVehicle;
      }catch(error){
  
  return ErrorResponse({ errors: { error: error.message } });
      } 
    
  }
  @Authorized("admin" )
  @Mutation((returns) => String, { nullable: true })
 
  async DeleteVehicle(@Arg("_id") _id: string) {
    try {
      
      await  VehicleModel.findOneAndDelete({
      _id
      });
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting A user .' },
      });
    }
  }
}