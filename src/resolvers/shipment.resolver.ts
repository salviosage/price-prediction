import ShipmentModel   from '../database/models/Shipment';
import DriverModel   from '../database/models/Driver';
import { Args,Arg, Mutation,Authorized, Query,Ctx, Resolver, UseMiddleware } from 'type-graphql';
import {
  ErrorResponse,
} from '../helpers/common.helper';

import {
 createShipmentMiddl,updateShipmentMiddl,verifyShipmentOrder
} from '../middlewares/shipment/shipment.middleware';
import { AddShipmentArgs,AssignDriverToShipmentArgs,GetShipmentsArgs,UpdateShipmentArgs } from '../schemas/shipments/args';
import Shipment, { ShipmentsPayload} from '../schemas/shipments';


@Resolver()
export default class ShipmentResolver {
  @Mutation((returns) => Shipment, { nullable: true })
  @UseMiddleware(
 createShipmentMiddl,
 verifyShipmentOrder
  )
  async createShipment(@Args() args: AddShipmentArgs) {
    try {
      const {shipmentOrderId}=args
      const shipment =await new ShipmentModel ({
       shipmentOrder:shipmentOrderId,
        ...args,
      }).save();
      return shipment
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while creating a shipment .' },
      });
    }
  }

  // @Authorized("admin")
  @Query((returns) => ShipmentsPayload, { nullable: true })
  
  async getShipments( @Args() {  skip, take }: GetShipmentsArgs) {
    try {
      const shipments =await  ShipmentModel.find({
    }).populate({
      path: 'shipmentOrder',
      model: 'ShipmentOrder'
      }).populate({
        path: 'notes',
        model: 'Note'
        }).populate({
          path: 'assignedDrivers',
          model: 'Driver',
          populate:{
            path:'assignedVehicle',
            Model:'Vehicle'
          }
          })
        
    .skip(skip).limit(take);
      const count =await  ShipmentModel.countDocuments({
      
      }).skip(skip).limit(take);
    
      return {
        shipments,
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
  @Query((returns) =>Shipment, { nullable: true })
 
  async getOneShipment(@Arg("_id") _id: string) {
    try {
      
      const shipment = await  ShipmentModel.findById({
      _id
      }).populate({
        path: 'shipmentOrder',
        model: 'ShipmentOrder'
        }).populate({
          path: 'notes',
          model: 'Note'
          }).populate({
            path: 'assignedDrivers',
            model: 'Driver',
            populate:{
              path:'assignedVehicle',
              Model:'Vehicle'
            }
            });
      if (shipment === undefined) {
        return ErrorResponse({
          errors: { error: 'shipment  not found .' },
        });
      }
      return shipment
      
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching shipment  .' },
      });
    }
  }
  

  // @Authorized()
  @Mutation((returns) => Shipment, { nullable: true })
  @UseMiddleware(updateShipmentMiddl)
  async updateShipment(@Args() args: UpdateShipmentArgs,@Ctx() ctx: any) {
    try{
      const a = JSON.parse(JSON.stringify(args))
      const {updates,id}=a
   
 
    const updatedShipment = await ShipmentModel.findOneAndUpdate({_id:id},
    updates,
      {new:true}).populate({
        path: 'shipmentOrder',
        model: 'ShipmentOrder'
        }).populate({
          path: 'notes',
          model: 'Note'
          }).populate({
            path: 'assignedDrivers',
            model: 'Driver',
            populate:{
              path:'assignedVehicle',
              Model:'Vehicle'
            }
            })
      
    return updatedShipment;
      }catch(error){
  
  return ErrorResponse({ errors: { error: error.message } });
      } 
    
  }
  // @Authorized()
  @Mutation((returns) => Shipment, { nullable: true })
  @UseMiddleware()
  async AssigndriverToShipment(@Args() args: AssignDriverToShipmentArgs,@Ctx() ctx: any) {
    try{
      const a = JSON.parse(JSON.stringify(args))
      const {driverId,shipmentId}=args
   const driver = await DriverModel.findOne({$and: [{_id:driverId },{"assignedDrivers": { $nin: [driverId ] } }]})
   console.log(driver)
   if (driver){
    const updatedShipment = await ShipmentModel.findOneAndUpdate( {$and: [{_id:shipmentId },{"assignedDrivers": { $nin: [driver._id ] } }]},
      { $push: { "assignedDrivers": driver._id } },
      {new:true}).populate({
        path: 'shipmentOrder',
        model: 'ShipmentOrder'
        }).populate({
          path: 'notes',
          model: 'Note'
          }).populate({
            path: 'assignedDrivers',
            model: 'Driver',
            populate:{
              path:'assignedVehicle',
              Model:'Vehicle'
            }
            })
      
    return updatedShipment;
   }else{
    return ErrorResponse({ errors: 'driver not found' });
   }
 
    
      }catch(error){
  
  return ErrorResponse({ errors: { error: error.message } });
      } 
    
  }
  
 
  
  @Authorized("admin" )
  @Mutation((returns) => String, { nullable: true })
 
  async deleteShipment(@Arg("_id") _id: string) {
    try {
      
      await  ShipmentModel.findOneAndDelete({
      _id
      });
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting Shipment  .' },
      });
    }
  }
}