import { ArgsType,InputType, Field} from 'type-graphql';
import {IContact,IDocument,UserInput,UserUpdateInput} from '../common'
@ArgsType()
export class ClientSignupArgs {
  @Field(()=>UserInput)
  userInfo!: UserInput
  @Field(()=> IContact ,{nullable:true})
  contact_persons:[IContact];
  @Field(()=> IDocument ,{nullable:true})
  documents:[IDocument];
}
@InputType()
export class ClientUpdateInput {
  @Field(()=>UserUpdateInput,{nullable:true})
  userInfo: UserUpdateInput
  @Field(()=> IContact ,{nullable:true})
  contact_persons:[IContact];
  @Field(()=> IDocument ,{nullable:true})
  documents:[IDocument];
  @Field({nullable:true})
  verified:boolean;
}
@ArgsType()
export class UpdateClientArgs {
  @Field()
  id!: string;
  @Field()
  updates!: ClientUpdateInput;
 
}
