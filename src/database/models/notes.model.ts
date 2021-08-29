import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { __Type } from "graphql";

@ObjectType({ description: "The Product model" })
export  class Note {
 @Field(()=> ID)
 _id: String;
  
  @Field()
  @Property({ required: true})
  title: string;

  @Field()
  @Property({ required: true})
  description:String

  @Field()
  avatar:String

  @Field()
  @Property({ required: true})
  type:String

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;

}

export const NoteModel = getModelForClass(Note);