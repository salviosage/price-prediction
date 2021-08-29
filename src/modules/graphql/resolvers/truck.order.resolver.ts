import { Resolver, Mutation, Args,Arg,Authorized, UseMiddleware, Query } from 'type-graphql';
import { TruckOrderResponse,TruckOrder ,TruckOrderModel , TruckOrdersResponse} from '../schemas/truckOrder/truck.order.schema';
import {CreateTruckOrderArgs,UpdateTruckOrderArgs,DeleteTruckOrderArgs,GetTruckOrdersArgs} from '../schemas/truckOrder/args'
import { ErrorResponse } from '../../helpers/users/users.helper';



@Resolver()
export default class TruckOrderResolver {
  @Authorized(["admin", "super_admin","operator"])
  @Query((returns) => TruckOrdersResponse, { nullable: true })
  async GetTruckOrders( @Args() {  skip, take }: GetTruckOrdersArgs) {
    try {
      const TruckOrders =await  TruckOrderModel.find({
      
      }).skip(skip).limit(take);
     
      // return TruckOrders
      
      const count =await  TruckOrderModel.countDocuments({
      
      }).skip(skip).limit(take);
    
      return {
        TruckOrders,
        count,
      };
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while creating truckOrder.' },
      });
    }
  }

  @Authorized(["admin", "super_admin"])
  @Query((returns) => TruckOrder, { nullable: true })
  async GetOneTruckOrder(@Arg("_id") _id: string) {
    try {
      
      const order = await  TruckOrderModel.findById({
      _id
      });
      if (order === undefined) {
        return ErrorResponse({
          errors: { error: 'Order not found .' },
        });
      }
      return order 
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching truck order .' },
      });
    }
  }
  @Authorized(["mormal_user", "super_admin"])
  @Mutation((returns) => String, { nullable: true })
 
  async DeleteTruckOrder(@Arg("_id") _id: string) {
    try {
      
      await  TruckOrderModel.findOneAndDelete({
      _id
      });
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting an order .' },
      });
    }
  }
  @Authorized()
  @Mutation((returns) => TruckOrderResponse, { nullable: true })
 
  async createTruckOrder(@Args() args: CreateTruckOrderArgs) {
    try {
      let { timeToDeliver } = args;
      if (timeToDeliver){
        timeToDeliver =new Date(timeToDeliver)
      }
      const order=await new TruckOrderModel({
        ...args,

        timeToDeliver: timeToDeliver,
      }).save();
      return {
        TruckOrder:order,
        message: 'your truckOrder has been created successfully.',
      };
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: error.message },
      });
    }
  }
  @Authorized()
  @Mutation((returns) => TruckOrderResponse, { nullable: true })
  async updateTruckOrder(@Args() args: UpdateTruckOrderArgs) {
    let { truckOrderId,updates } = args;

    try{
    updates={...updates}
    const updatedOrder=TruckOrderModel.findOneAndUpdate({_id:truckOrderId},updates,{new:true})
    
      return {  TruckOrder:updatedOrder,message: 'truckOrder updated sucesssfully' };
    }catch(error){

return ErrorResponse({ errors: { error: error.message } });
    }
    


    
  }
} 