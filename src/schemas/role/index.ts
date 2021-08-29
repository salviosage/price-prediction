import { ObjectType, Field, ID } from 'type-graphql';
@ObjectType()
export default class Role {
    @Field(type => ID)
    id: string;
    @Field()
    title: string
    @Field()
    description: string
    @Field()
    privilegeLevel: Number;
    @Field()
    createdAt: Date;
    @Field()
    updatedAt: Date;
}
@ObjectType()
export class CreateRoleReturn {
    @Field()
    role: Role;
    @Field()
    message: string;
}


@ObjectType()
export class RolesPayload {
    @Field(() => Role)
    roles?: [Role];
    @Field()
    count?: number;
}