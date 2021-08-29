
import RealtimeDriverModel from '../database/models/RealTimeDrivers';
import { Args, Arg, Mutation, Subscription, Authorized, PubSubEngine, Query, Ctx, Root, PubSub, Resolver, UseMiddleware } from 'type-graphql';

import {
  ErrorResponse,
} from '../helpers/common.helper';


import { REAL_TIME_DRIVERS_CHANGE,IS_DRIVER_ONDUTY } from '../constants'
import { CreateRealTimeDriverArgs, UpdateRealTimeDriversArgs, GetRealTimeDriversArgs } from '../schemas/realTimeDrivers/args';
import RealTimeDrivers, { RealTimeDriversPayload } from '../schemas/realTimeDrivers';

import { verifyDriver, updateRealtimeDriverMiddl, createRealTimeDriverMiddl } from '../middlewares/realtimedrivers/realtime.driver.middleware';


@Resolver()
export default class RealTimeDriverResolver {
  @Authorized()
  @Mutation((returns) => String, { nullable: true })
  @UseMiddleware(
    verifyDriver,
    createRealTimeDriverMiddl,

  )
  async createRealTimeDriver(@Args() args: CreateRealTimeDriverArgs, @Ctx() ctx: any, @PubSub() pubsub: PubSubEngine) {
    try {
      const a = JSON.parse(JSON.stringify(args));
      const {id}=ctx.user
      
      const dr=await RealtimeDriverModel.findOne({ driver:id });
      if (!dr){
      await new RealtimeDriverModel({
        driver:id,...a,
      }).save();
      }
      else {

      }
      const d = await RealtimeDriverModel.updateOne({ driver:id }, 
        { 
          "$set": {
              "liveLocation": a.liveLocation
          }
      },
        );
      
      
      const realtimeData = await RealtimeDriverModel.find()
      // .populate({
      //   path: 'driver',
      //   model: 'Driver',populate:{
      //     path:'assignedVehicle',
      //     Model:'Vehicle'
      //   }
      //   })

      const count = await RealtimeDriverModel.countDocuments({

      });


      await pubsub.publish('REAL_TIME_DRIVERS_CHANGE', { drivers: realtimeData, count }
      );
      
      return ' created successfully.';
    } catch (error) {
      console.log(error)
      if (error.name === "ValidationError") {
        let errors = {};
  
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        
        return ErrorResponse({ errors });
        
      }
      else if ( error.name === "MongoError" && error.code === 11000) {
        return ErrorResponse({ errors: "duplication errror" });
        
      }
      return ErrorResponse({ errors: "Something went wrong" });
    }
  }

  @Authorized("admin")
  @Query((returns) => RealTimeDriversPayload, { nullable: true })

  async GetRealTimeDriver(@Args() { skip, take }: GetRealTimeDriversArgs) {
    try {
      const realtimed = await RealtimeDriverModel.find({

      })
        // .populate({
        //   path: 'driver',
        //   model: 'Driver',populate:{
        //     path:'assignedVehicle',
        //     Model:'Vehicle'
        //   }
        //   })
        .skip(skip).limit(take);


      const count = await RealtimeDriverModel.countDocuments({

      }).skip(skip).limit(take);

      return {
        realtimed,
        count,
      };
    } catch (error) {

      return ErrorResponse({
        errors: { error: 'An error occurred while fetching realtime drivers.' },
      });
    }
  }


  @Authorized("admin")
  @Query((returns) => RealTimeDrivers, { nullable: true })

  async GetRealTimeDrivers(@Arg("_id") _id: string) {
    try {
      const driver = await RealtimeDriverModel.findById(
        _id
      );
      // .populate({
      //   path: 'driver',
      //   model: 'Driver',populate:{
      //     path:'assignedVehicle',
      //     Model:'Vehicle'
      //   }
      //   })


      return driver
    } catch (error) {

      return ErrorResponse({
        errors: { error: 'An error occurred while fetching realtime drivers.' },
      });
    }
  }


  @Authorized()
  @Mutation((returns) => String, { nullable: true })
  @UseMiddleware(updateRealtimeDriverMiddl)
  async RealTimeDriverUpdate(@Args() args: UpdateRealTimeDriversArgs, @Ctx() ctx: any, @PubSub() pubsub: PubSubEngine) {
    try {
      const { liveLocation} = args
      const {id}=ctx.user
      const update = { liveLocation }

      const updated = await RealtimeDriverModel.findOneAndUpdate({ _id: id },
        { update },
        { new: true })
      const realtimeData = await RealtimeDriverModel.find()
      // .populate({
      //   path: 'driver',
      //   model: 'Driver',populate:{
      //     path:'assignedVehicle',
      //     Model:'Vehicle'
      //   }
      //   })
      const count = await RealtimeDriverModel.countDocuments({

      });

      await pubsub.publish('REAL_TIME_DRIVERS_CHANGE', { drivers: realtimeData, count }
      );
      return ' created successfully.';
    } catch (error) {

      return ErrorResponse({ errors: { error: error.message } });
    }

  }

  @Authorized( )
  @Mutation((returns) => String, { nullable: true })

  async DeleteRealTimeDriver(@Arg("_id") _id: string, @Ctx() ctx: any, @PubSub() pubsub: PubSubEngine) {
    try {
      // const {pubsub}=ctx;
      await RealtimeDriverModel.findOneAndDelete({
        _id
      });
      const realtimeData = await RealtimeDriverModel.find()
      // .populate({
      //   path: 'driver',
      //   model: 'Driver',populate:{
      //     path:'assignedVehicle',
      //     Model:'Vehicle'
      //   }
      //   })
      const count = await RealtimeDriverModel.countDocuments({

      });

      await pubsub.publish('REAL_TIME_DRIVERS_CHANGE', { drivers: realtimeData, count }
      );

      return "deleted sucessfully"

    } catch (error) {

      return ErrorResponse({
        errors: { error: 'An error accured while deleting  .' },
      });
    }
  }



  @Subscription({
    topics: REAL_TIME_DRIVERS_CHANGE,
  }
  )
  realTimeDriversub(
    @Root() data: RealTimeDriversPayload,
  ): RealTimeDriversPayload {
    
    return data
  }

}