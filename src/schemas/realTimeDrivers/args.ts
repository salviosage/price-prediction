
import { ArgsType,InputType, Field} from 'type-graphql';
import {
  Min,
  Max,
} from 'class-validator';
import {IRegion} from '../common'


@ArgsType()
export class CreateRealTimeDriverArgs {
  
  
  @Field(()=>IRegion)
  liveLocation:IRegion;
}

@ArgsType()
export class UpdateRealTimeDriversArgs {
  
  @Field(()=>IRegion,{nullable:true})
  liveLocation!:IRegion;
}


@ArgsType()
export class GetRealTimeDriversArgs {
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