import Position, { PositionsPayload,CreatePositionReturn } from '../schemas/position';
import PositionModel   from '../database/models/Position';

import { Args,Arg, Mutation,Authorized, Query,Ctx, Resolver, UseMiddleware } from 'type-graphql';
import {
  ErrorResponse,
} from '../helpers/common.helper';
import { UpdatePositionArgs,PositionArgs,GetPositionsArgs} from '../schemas/position/args';

import {verifyDepartment, verifyExistingPosition, CreatePositionMiddl,UpdatePositionMiddl} from '../middlewares/position/verify.middleware'



@Resolver()
export default class PositionResolver {

  @Authorized()
  @Query((returns) => PositionsPayload, { nullable: true })
  
  async GetPositions( @Args() {  skip, take }: GetPositionsArgs) {
    try {
      const positions =await  PositionModel.find({
    
      }).skip(skip).limit(take);
      
      
      const count =await  PositionModel.countDocuments({
      
      }).skip(skip).limit(take);
    
      return {
        positions,
        count,
      };
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching Positions.' },
      });
    }
  }
  @Authorized()
  @Query((returns) =>Position, { nullable: true })
 
  async GetOnePosition(@Arg("_id") _id: string) {
    try {
      
      const position = await  PositionModel .findById({
      _id
      });
      if (!position) {
        return ErrorResponse({ errors: "Position not found ." });
        
      }
      return position
      
    } catch (error) {
     
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching position .' },
      });
    }
  }
  @Mutation((returns) => CreatePositionReturn, { nullable: true })
  @UseMiddleware(verifyExistingPosition,verifyDepartment,CreatePositionMiddl)
  async createPosition(@Args() args: PositionArgs) {
    try{
     
       const position = await new PositionModel(args
        ).save();
       
      
      
      return {
          position,
          message:"Position Created Successfully"};
    }catch(error){
      return ErrorResponse({ errors: "Something went wrong while creating Position" });
    }
   
  }
  
  
  
 
  @Authorized()
  @Mutation((returns) => CreatePositionReturn, { nullable: true })
  @UseMiddleware(  verifyDepartment, verifyExistingPosition,UpdatePositionMiddl)
  async updatePosition(@Args() args: UpdatePositionArgs,@Ctx() ctx: any) {
    try{
        const {updates,id}=args
    const update = {...updates, updatedAt: new Date()}
  
    const updatedPos = await PositionModel.findOneAndUpdate({id},
      {...update},
      {new:true})
      if (!updatedPos){
        return ErrorResponse({ errors: "Position Not Found" });
      }
      return {position:updatedPos,message:"Position updated successfully"};
      }catch(error){
  
  return ErrorResponse({ errors:"something went wrong while updating position" });
      } 
    
  }

  @Authorized( )
  @Mutation((returns) => String, { nullable: true })
 
  async DeletePosition(@Arg("_id") _id: string) {
    try {
      
      const dep= await  PositionModel .findOneAndDelete({
      _id
      });
      if (!dep){
        return ErrorResponse({
            errors: { error: 'No Position Found .' },
          });
      }
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting A Position .' },
      });
    }
  }

}


