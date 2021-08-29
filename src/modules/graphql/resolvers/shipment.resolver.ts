import { Resolver, Mutation, Args,Arg,Authorized, UseMiddleware, Query } from 'type-graphql';
import { CreaateShipmentResponse,Shipment ,ShipmentModel , ShipmentsResponse} from '../schemas/shipment/shipment.schema';
import {CreateShipmentArgs,UpdateShipmentArgs,DeleteShipmentArgs,GetShipmentsArgs} from '../schemas/shipment/args'
import { ErrorResponse } from '../../helpers/users/users.helper';



@Resolver()
export default class ShipmentResolver {
  @Authorized(["admin", "super_admin"])
  @Query((returns) => ShipmentsResponse, { nullable: true })
  
  async GetShipments( @Args() {  skip, take }: GetShipmentsArgs) {
    try {
      const Shipments =await  ShipmentModel.find({
      
      }).skip(skip).limit(take);
      console.log(Shipments.length)
      // return Shipments
      
      const count =await  ShipmentModel.countDocuments({
      
      }).skip(skip).limit(take);
    console.log(Shipments)
      return {
        Shipments,
        count,
      };
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while creating shipment.' },
      });
    }
  }
  @Authorized(["admin", "super_admin"])
  @Query((returns) => Shipment, { nullable: true })
 
  async GetOneShipment(@Arg("_id") _id: string) {
    try {
      
      const order = await  ShipmentModel.findById({
      _id
      });
      if (order === undefined) {
        return ErrorResponse({
          errors: { error: 'Order not found .' },
        });
      }
      return order 
      
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching truck order .' },
      });
    }
  }
  @Authorized(["admin", "super_admin"])
  @Mutation((returns) => String, { nullable: true })
 
  async DeleteShipment(@Arg("_id") _id: string) {
    try {
      
      await  ShipmentModel.findOneAndDelete({
      _id
      });
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting an order .' },
      });
    }
  }
  @Authorized(["admin", "super_admin"])
  @Mutation((returns) => CreaateShipmentResponse, { nullable: true })
 
  async CreateShipment(@Args() args: CreateShipmentArgs) {
    try {
      
      const order=await new ShipmentModel({
        ...args,

        // timeToDeliver: timeToDeliver,
      }).save();
      return {
        Shipment:order,
        message: 'your shipment has been created successfully.',
      };
    } catch (error) {
      console.log(error)
      return ErrorResponse({
        errors: { error: "error.message "},
      });
    }
  }
  @Authorized(["admin", "super_admin"])
  @Mutation((returns) => CreaateShipmentResponse, { nullable: true })
  async updateShipment(@Args() args: UpdateShipmentArgs) {
    let { shipmentId,updates } = args;

    try{
    updates={...updates}
    const updatedOrder=ShipmentModel.findOneAndUpdate({_id:shipmentId},updates,{new:true})
    
      return {  Shipment:updatedOrder,message: 'shipment updated sucesssfully' };
    }catch(error){

return ErrorResponse({ errors: { error: error.message } });
    }
    


    
  }
} 