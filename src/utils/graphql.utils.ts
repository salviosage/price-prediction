import { graphql } from 'graphql';
import { buildSchema } from 'type-graphql';
import {customAuthChecker} from './auth.checker'
interface IOptions {
  source: string;
  variableValues?: any;
}
export const createSchema = async () => {
  try {
    return await buildSchema({
      resolvers: [__dirname + '/../modules/**/*.resolver.ts'],
      emitSchemaFile: true,
      authChecker: customAuthChecker,
      // authMode: "null",
      
    });
  } catch (error) {
    console.log('error', error);
  }
};

// export const graphQLTestSchema = async ({
//   source,
//   variableValues,
// }: IOptions) => {
//   try {
//     return graphql({
//       schema: await createSchema(),
//       source,
//       variableValues,
//     });
//   } catch (error) {
//     console.log('error', error);
//   }
// };
