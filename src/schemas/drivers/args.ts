
import { ArgsType, Field} from 'type-graphql';
import {IDocument,UserInput,UserUpdateInput} from '../common'


@ArgsType()
export class DriverArgs {
  @Field(()=>UserInput)
  userInfo!: UserInput
  @Field({nullable:true})
  passport: string
  @Field({nullable:true})
  national_id: string;
  @Field(()=> IDocument ,{nullable:true})
  documents!:[IDocument];
  @Field({nullable:true})
  work_phone_number: string;
  @Field({nullable:true})
  driving_permit:string;
  @Field({nullable:true})
  truck_insurance!:string;
  @Field({nullable:true})
  truck_plate_number!:string;
  @Field({nullable:true})
  carte_jaune:string;
}

@ArgsType()
export class UpdateDriverArgs {
  @Field(()=>UserUpdateInput,{nullable:true})
  userInfo: UserUpdateInput
  @Field({nullable:true})
  passport: string
  @Field({nullable:true})
  national_id: string;
  @Field(()=> IDocument ,{nullable:true})
  documents!:[IDocument];
  @Field({nullable:true})
  work_phone_number: string;
  @Field({nullable:true})
  verified: Boolean;
  @Field({nullable:true})
  driving_permit:string;
  @Field({nullable:true})
  truck_insurance!:string;
  @Field({nullable:true})
  truck_plate_number!:string;
  @Field({nullable:true})
  carte_jaune:string;
}
