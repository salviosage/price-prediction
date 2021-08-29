import Department, { DepartmentsPayload,CreatedepartmentReturn } from '../schemas/department';
import DepartmentModel   from '../database/models/Department';

import { Args,Arg, Mutation,Authorized, Query,Ctx, Resolver, UseMiddleware } from 'type-graphql';
import {
  ErrorResponse,
} from '../helpers/common.helper';

import { UpdateDepartmentArgs,DepartmentArgs,GetDepartmentsArgs} from '../schemas/department/args';

import {verifyDepartment, CreateDepartmentMiddl,UpdateDepartmentMiddl} from '../middlewares/department/verify.middleware'



@Resolver()
export default class DepartmentResolver {

  @Authorized()
  @Query((returns) => DepartmentsPayload, { nullable: true })
  
  async GetDepartments( @Args() {  skip, take }: GetDepartmentsArgs) {
    try {
      const departments =await  DepartmentModel.find({
    
      }).skip(skip).limit(take);
      
      
      const count =await  DepartmentModel.countDocuments({
      
      }).skip(skip).limit(take);
    
      return {
        departments:departments,
        count,
      };
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching Departments.' },
      });
    }
  }
  @Authorized()
  @Query((returns) =>Department, { nullable: true })
 
  async GetOneDepartment(@Arg("_id") _id: string) {
    try {
      
      const department = await  DepartmentModel .findById({
      _id
      });
      if (!department) {
        return ErrorResponse({ errors: "Department not found ." });
        
      }
      return department
      
    } catch (error) {
     
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching department .' },
      });
    }
  }
  @Mutation((returns) => CreatedepartmentReturn, { nullable: true })
  @UseMiddleware(verifyDepartment,CreateDepartmentMiddl)
  async createDepartment(@Args() args: DepartmentArgs) {
    try{
     
      
        const dep = await new DepartmentModel(args
        ).save();
       
      
      return {
          department:dep,
          message:"Department Created Successfully"};
    }catch(error){
      return ErrorResponse({ errors: "Something went wrong while creating Department" });
    }
   
  }
  
  
  
 
  @Authorized()
  @Mutation((returns) => CreatedepartmentReturn, { nullable: true })
  @UseMiddleware(verifyDepartment,UpdateDepartmentMiddl)
  async updateDepartment(@Args() args: UpdateDepartmentArgs,@Ctx() ctx: any) {
    try{
        const {updates,id}=args
    const update = {...updates, updatedAt: new Date()}
  
    const updatedDep = await DepartmentModel.findOneAndUpdate({id},
      {...update},
      {new:true})
      if (!updatedDep){
        return ErrorResponse({ errors: "Department Not Found" });
      }
      return {department:updatedDep,message:"Department updated successfully"};
      }catch(error){
  
  return ErrorResponse({ errors:"something went wrong while updating department" });
      } 
    
  }

  @Authorized( )
  @Mutation((returns) => String, { nullable: true })
 
  async DeleteDepartment(@Arg("_id") _id: string) {
    try {
      
      const dep= await  DepartmentModel .findOneAndDelete({
      _id
      });
      if (!dep){
        return ErrorResponse({
            errors: { error: 'No Department Found .' },
          });
      }
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting A Department .' },
      });
    }
  }

}

