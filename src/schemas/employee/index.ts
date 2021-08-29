import { Field, ObjectType,ID } from 'type-graphql';
import {DepartmentType,UserType} from '../common/enums.types'
import {ORegion,ODocument } from '../common'
import User from '../users'
@ObjectType()
export default class Employee {
  @Field(type => ID)
  id: string;
  @Field(()=>User)
  user: User
  @Field()
  position!: string;
  @Field({ nullable: true })
  start_date!: Date;
  @Field({ nullable: true })
  end_date!: Date;
  @Field()
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
  @Field(()=> ODocument ,{nullable:true})
  documents!:[ODocument];
  @Field(()=> ORegion ,{nullable:true})
  address!:[ORegion];
  @Field({ nullable: true })
  verified!: boolean;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

@ObjectType()
export class EmployeeLogin {
  @Field()
  user: Employee ;
  @Field()
  token: string;
}


@ObjectType()
export class EmployeesPayload {
  @Field(()=>User)
  users?: [Employee];
  @Field()
  count?: number;
}