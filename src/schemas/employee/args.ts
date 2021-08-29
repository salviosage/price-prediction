import { ArgsType,InputType, Field} from 'type-graphql';
import {DepartmentType} from '../common/enums.types'
import {IRegion,IDocument,UserInput,UserUpdateInput} from '../common'
@ArgsType()
 export class EmployeeArgs {
  @Field(()=>UserInput)
  userInfo: UserInput
  @Field()
  position!: string;
  @Field({ nullable: true })
  start_date!: Date;
  @Field({ nullable: true })
  end_date!: Date;
  @Field()
  department: DepartmentType;
  @Field()
  work_email!: string;
  @Field()
  work_phone_number!: string;
  @Field({ nullable: true })
  t_shirt_size!: string;
  @Field({ nullable: true })
  passport!: string;
  @Field({ nullable: true })
  national_id!: string;
  @Field({ nullable: true })
  status!: string;
  @Field(()=> IDocument ,{nullable:true})
  documents!:[IDocument];
  @Field(()=> IRegion ,{nullable:true})
  address!:[IRegion];
  @Field({ nullable: true })
  verified!: boolean;
}
@InputType()
 export class EmployeeUpdateArgs {
  @Field(()=>UserUpdateInput,{nullable:true})
  userInfo!: UserUpdateInput
  @Field({ nullable: true })
  position!: string;
  @Field({ nullable: true })
  start_date!: Date;
  @Field({ nullable: true })
  end_date!: Date;
  @Field({ nullable: true })
  department: DepartmentType;
  @Field({ nullable: true })
  work_email!: string;
  @Field({ nullable: true })
  work_phone_number!: string;
  @Field({ nullable: true })
  t_shirt_size!: string;
  @Field({ nullable: true })
  passport!: string;
  @Field({ nullable: true })
  national_id!: string;
  @Field({ nullable: true })
  status!: string;
  @Field(()=> IDocument ,{nullable:true})
  documents!:[IDocument];
  @Field(()=> IRegion ,{nullable:true})
  address!:[IRegion];
  @Field({ nullable: true })
  verified!: boolean;
}


@ArgsType()
export class UpdateemployeeArgs {
  @Field()
  id: string;
  @Field()
  updates: EmployeeUpdateArgs ;
 
}
