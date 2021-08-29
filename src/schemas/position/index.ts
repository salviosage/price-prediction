import { ObjectType, Field, ID } from 'type-graphql';
import User from '../users'
import Department from '../department'
@ObjectType()
export default class Position {
    @Field(type => ID)
    id: string;
    @Field()
    title: string
    @Field({nullable:true})
    description: string;
    @Field(Type=>User,{nullable:true})
    assignedEmployees: [User];
    @Field(Type=>Department,{nullable:true})
    department:Department
    @Field()
    createdAt: Date;
    @Field()
    updatedAt: Date;
}
@ObjectType()
export class CreatePositionReturn {
    @Field()
    position: Position;
    @Field()
    message: string;
}


@ObjectType()
export class PositionsPayload {
    @Field(() => Position,{nullable:true})
    positionss?: [Position];
    @Field()
    count?: number;
}