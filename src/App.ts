import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import 'reflect-metadata';
import { connect } from './database/connect';
import { createSchema } from './utils/graphql.utils';
import nodemailer from 'nodemailer';
import {CheckUser} from './utils/authorize'
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
     return {user:user, ...req.context}
    },
  });
  server.start({
    endpoint: '/graphql',
    formatError: (err: any) => err.message,
    debug: false,
  });
  // tslint:disable-next-line: no-console
  console.log(`Server is running on PORT 4000`);
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
