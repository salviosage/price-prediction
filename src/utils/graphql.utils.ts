

import { buildSchema } from 'type-graphql';
import {customAuthChecker} from './auth.checker'
interface IOptions {
  source: string;
  variableValues?: any;
}
export const createSchema = async () => {
  try {
    return await buildSchema({
      resolvers: [__dirname + '/../resolvers/*.resolver.{ts,js}'],
      emitSchemaFile: true,
      nullableByDefault: false,
      authChecker: customAuthChecker,
      // authMode: "null",
      
    });
  } catch (error) {
    console.log(error)
    console.log('error', error.message);
  }
};

