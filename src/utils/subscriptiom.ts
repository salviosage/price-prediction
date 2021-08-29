


import DriverModel from '../database/models/Driver'
import RealtimeDriverModel from '../database/models/RealTimeDrivers'
import { PubSub } from 'graphql-yoga';
import { GetUserFromToken } from './authorize'
import 'reflect-metadata';


const pubsub = new PubSub()
export const onSubConnect = async (connectionParams, webSocket, context) => {
  // Check if user is authenticated
  try {
    const user = await GetUserFromToken(
      connectionParams.Authorization,
    )
    // Publish user isOnline true
    if (user) {
      const isDriver = await DriverModel.findOne({ phoneNumber: user?.phoneNumber })
      if (isDriver) {

        await RealtimeDriverModel.findOneAndUpdate({ driver: isDriver.id }, { isOnline: true }, { upsert: true });

      }

    }

    // Add authUser to socket's context, so we have access to it, in onDisconnect method
    return {

      authUser: user,
    }
  } catch (err) {
    console.log(err)
  }
}

export const onSubDisconnect = async (webSocket, context) => {
  // Get socket's context
  try {
    const c = await context.initPromise
    console.log(c)
    if (c && c.authUser) {
      const user = c.authUser
      const isDriver: any = await DriverModel.findOne({ phoneNumber: user?.phoneNumber })
      if (isDriver) {
        await RealtimeDriverModel.findOneAndUpdate({ driver: isDriver.id }, { isOnline: false }, { upsert: true })
      }
    }
  } catch (err) {
    console.log(err)
  }
}
