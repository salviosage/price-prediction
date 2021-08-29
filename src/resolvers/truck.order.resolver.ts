import ShipmentOrderModel   from '../database/models/ShipmentOrder';
import { Args,Arg, Mutation,Authorized, Query,Ctx, Resolver, UseMiddleware } from 'type-graphql';
import {
  ErrorResponse,
} from '../helpers/common.helper';

import {
 createShipmentOrderMiddl,updateShipmentOrderMiddl
} from '../middlewares/shipment/shipment.order.middleware';
import { AddShipmentOrderArgs,GetShipmentOrdersArgs,UpdateShipmentOrderArgs } from '../schemas/shipmentOrder/args';
import ShipmentOrder, { ShipmentOrdersPayload} from '../schemas/shipmentOrder';


@Resolver()
export default class ShipmentOrderResolver {
  @Mutation((returns) => ShipmentOrder, { nullable: true })
  @UseMiddleware(
 createShipmentOrderMiddl
  )
  async createShipmentOrder(@Args() args: AddShipmentOrderArgs) {
    try {
     const shipmentOrder= await new ShipmentOrderModel ({
        ...args,
      }).save();
      console.log(shipmentOrder)
      return shipmentOrder;
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while placing a shipment order.' },
      });
    }
  }

  @Authorized("admin")
  @Query((returns) => ShipmentOrdersPayload, { nullable: true })
  
  async getShipmentOrders( @Args() {  skip, take }: GetShipmentOrdersArgs) {
    try {
      const shipmentOrders =await  ShipmentOrderModel.find({
    
      }).skip(skip).limit(take);
      
      
      const count =await  ShipmentOrderModel.countDocuments({
      
      }).skip(skip).limit(take);
    
      return {
        shipmentOrders,
        count,
      };
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching shipment.' },
      });
    }
  }
  @Authorized("admin", "operator")
  @Query((returns) =>ShipmentOrder, { nullable: true })
 
  async getOneShipmentOrder(@Arg("_id") _id: string) {
    try {
      
      const shipment = await  ShipmentOrderModel.findById({
      _id
      });
      if (shipment === undefined) {
        return ErrorResponse({
          errors: { error: 'shipment order not found .' },
        });
      }
      return shipment
      
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching shipment order .' },
      });
    }
  }
  

  @Authorized()
  @Mutation((returns) => ShipmentOrder, { nullable: true })
  @UseMiddleware(updateShipmentOrderMiddl)
  async updateShipmentOrder(@Args() args: UpdateShipmentOrderArgs,@Ctx() ctx: any) {
    try{
      const {updates,id}=args
   
  
    const updatedUser = await ShipmentOrderModel.findOneAndUpdate({id},
      {updates},
      {new:true})
    return updatedUser;
      }catch(error){
  
  return ErrorResponse({ errors: { error: error.message } });
      } 
    
  }
  
  @Authorized("admin" )
  @Mutation((returns) => String, { nullable: true })
 
  async deleteShipmentOrder(@Arg("_id") _id: string) {
    try {
      
      await  ShipmentOrderModel.findOneAndDelete({
      _id
      });
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting Shipment Order .' },
      });
    }
  }
}

