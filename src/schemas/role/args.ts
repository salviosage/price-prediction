import { ArgsType,InputType, Field} from 'type-graphql';
import {
  Min,
  Max,
} from 'class-validator';



@ArgsType()
export class RoleArgs {
  @Field()
    title: string
    @Field()
    description: string
    @Field({defaultValue:10})
    privilegeLevel: Number;
}
@InputType()
export class UpdateRoleInput {
  @Field({nullable:true})
    title!: string
    @Field({nullable:true})
    description!: string
    @Field({nullable:true})
    privilegeLevel!: Number;
  
}
@ArgsType()
export class UpdateRoleArgs {
  @Field()
    id: string;
    @Field()
    updates:UpdateRoleInput
}

@ArgsType()
export class GetRolesArgs {
  @Field(type => Number, { defaultValue: 0 })
  @Min(0)
  skip: number;

  @Field(type => Number)
  @Min(1)
  @Max(50)
  take = 25;

 // helpers - index calculations
  get startIndex(): number {
    return this.skip;
  }
  get endIndex(): number {
    return this.skip + this.take;
  }
}