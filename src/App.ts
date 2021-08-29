import dotenv from 'dotenv';
import { GraphQLServer ,PubSub} from 'graphql-yoga';
import 'reflect-metadata';
import { connect } from './database/connect';
import { createSchema } from './utils/graphql.utils';
import nodemailer from 'nodemailer';
import {CheckUser} from './utils/authorize'
import {onSubConnect, onSubDisconnect} from './utils/subscriptiom'
const pubsub = new PubSub()
// dotenv
dotenv.config();
connect();
// init APP
const App = async () => {
  // connect App to database
  const schema = await createSchema();
  
  const server = new GraphQLServer({ 
    schema,
    context: async ( req:any ) => {
      // get the user token from the headers
      
      const user= await CheckUser(req.request)
     return {user:user,pubsub , ...req.context}
    },
    
  });
  const options ={
    port: process.env.PORT || 4000,
    endpoint: '/graphql',
    formatError: (err: any) => err.message,
    debug: false,
    subscriptions:
    {
      onConnect: async (connectionParams, webSocket,context) =>  {
        console.log('connecting ')
        return onSubConnect(connectionParams,webSocket,context)
      },
      onDisconnect: async (webSocket, context) => {
        console.log('disconnecting ')
        return onSubDisconnect(webSocket, context)
      }
    }
  }
  server.start({
    ...options
  });
  // tslint:disable-next-line: no-console
  console.log(`Server is running on PORT ${server.options.port}`);
 
};

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: `${process.env.ACCOUNT_EMAIL}`,
    pass: `${process.env.ACCOUNT_PASSWORD}`
  }
});

App();
export default transporter;
