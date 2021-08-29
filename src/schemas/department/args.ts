import { ArgsType,InputType, Field} from 'type-graphql';
import {
  Min,
  Max,
} from 'class-validator';




@ArgsType()
export class DepartmentArgs {
    @Field()
    title: string
    @Field({nullable:true})
    description: string; 
}
@InputType()
export class UpdateDepartmentInput {
    @Field({nullable:true})
    title: string
    @Field({nullable:true})
    description: string;
}
@ArgsType()
export class UpdateDepartmentArgs {
  @Field()
    id: string;
    @Field()
    updates:UpdateDepartmentInput
}

@ArgsType()
export class GetDepartmentsArgs {
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