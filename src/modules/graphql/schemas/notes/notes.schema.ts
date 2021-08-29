import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { __Type } from "graphql";
import {NoteType,NoteToType} from '../common'

@ObjectType({ description: "The Note model" })
export  class Note {
 @Field(()=> ID)
 _id: String;
  
  @Field()
  @Property({ required: true})
  title: string;

  @Field()
  @Property({ required: false})
  description:String

  @Field()
  @Property({ required: false})
  avatar:String

  @Field(()=>NoteToType,{defaultValue: NoteToType.REMINDER })
    to: NoteToType;

  @Field()
  @Property({ enum: NoteType,default:NoteType.DEFAULTNOTE})
  type:NoteType

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

}

export const NoteModel = getModelForClass(Note,{ schemaOptions: { timestamps: true } });
@ObjectType()
export class CreateNoteResponse {
  @Field()
  note: Note;
  @Field()
  message: string;
}
@ObjectType()
export class NotesResponse {
  @Field(() => Note)
  notes: [Note];
  @Field()
  count: number;
}