import { ArgsType,InputType, Field} from 'type-graphql';
import {
  Min,
  Max,
} from 'class-validator';
import {NoteType} from '../common/enums.types'

@InputType()
export class NoteInput {
    @Field()
    title: string;
    @Field({defaultValue:NoteType.DEFAULTNOTE})
    type: NoteType;
    @Field({nullable:false})
    description:string
    @Field({nullable:true})
    coverImage!:string;
}
@InputType()
export class UpdateNoteInput {
  @Field({nullable:true})
  title: string;
  @Field({nullable:true})
  type: NoteType;
  @Field({nullable:true})
  description:string
  @Field({nullable:true})
  coverImage!:string;
  
}


@ArgsType()
export class UpdateNoteArgs {
  @Field()
  noteId: string;
  @Field()
  updates: UpdateNoteInput;
 
}
@ArgsType()
export class CreateNoteArgs {
  @Field()
  shipmentId: string;
  @Field()
  noteData: NoteInput;
 
}

@ArgsType()
export class GetNotesArgs {
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