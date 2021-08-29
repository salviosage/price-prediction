import { ArgsType,InputType, Field } from 'type-graphql';
import {
  Length,
  Min,
  Max,
} from 'class-validator';
import {NoteType,NoteToType} from '../common'

@InputType()
export class UpdateNoteInput {

  @Field({ nullable: true })
  @Length(3, 30,{message: 'title should be 3 to 30  long'})
  title?: string;

  @Field(()=>NoteType,{nullable: true })
  type?: NoteType;

  @Field(()=>NoteToType,{nullable: true })
  to?: NoteToType;

  @Field({ nullable: true })
  avatar?: string;


  @Field({ nullable: true })
  @Length(3, 100,{message: 'description should be 3 to 100 long'})
  description?: string;
 
}
@InputType()
export class CreateNoteInput {
  
  @Field()
  @Length(3, 30,{message: 'name should be 3 to 30  long'})
  title: string;
  @Field()
  type: string;

  @Field(()=>NoteToType,{defaultValue: NoteToType.REMINDER })
  to?: NoteToType;

  @Field({ nullable: true })
  avatar?: string;


  @Field({ nullable: true })
  @Length(3, 100,{message: 'description should be 3 to 100 long'})
  description?: string;

}
@ArgsType()
export class CreateNoteArgs {
  
  @Field({ nullable: true })
  refId: string;
  @Field(() => CreateNoteInput)
  inputs: CreateNoteInput
 
}

@ArgsType()
export class DeleteNoteArgs {
  @Field()
  noteId: string;
}
@ArgsType()
export class UpdateNoteArgs {
  @Field()
  noteId: string;
  @Field(() => UpdateNoteInput)
  updates: UpdateNoteInput
  
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
