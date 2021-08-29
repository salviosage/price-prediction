import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class FormulaArgs {
  @Field()
  depreciationName: string;
  @Field()
  distance: string;
}
