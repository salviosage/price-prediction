import { ArgsType,InputType, Field} from 'type-graphql';
import {
  Min,
  Max,
} from 'class-validator';




@ArgsType()
export class PositionArgs {
    @Field()
    title: string
    @Field({nullable:true})
    description: string
    @Field({nullable:true})
    department:string
}
@InputType()
export class UpdatePositionInput {
    @Field({nullable:true})
    title: string
    @Field({nullable:true})
    description: string
    @Field({nullable:true})
    department:string
  
}
@ArgsType()
export class UpdatePositionArgs {
  @Field()
    id: string;
    @Field()
    updates:UpdatePositionInput
}

@ArgsType()
export class GetPositionsArgs {
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