import { ObjectType, Field, ID } from 'type-graphql';
import User from '../users'
@ObjectType()
export default class Department {
    @Field(type => ID)
    id: string;
    @Field()
    title: string
    @Field({nullable:true})
    description: string;
    @Field(Type=>User,{nullable:true})
    assignedEmployees: [User];
    @Field()
    createdAt: Date;
    @Field()
    updatedAt: Date;
}
@ObjectType()
export class CreatedepartmentReturn {
    @Field()
    department: Department;
    @Field()
    message: string;
}


@ObjectType()
export class DepartmentsPayload {
    @Field(() => Department,{nullable:true})
    departments?: [Department];
    @Field()
    count?: number;
}