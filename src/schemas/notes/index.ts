import { ObjectType, Field,ID } from 'type-graphql';
import {NoteType} from '../common/enums.types'
import Driver from '../drivers'


@ObjectType()
export default class Note { 
  @Field(type => ID)
  id: string;
  @Field()
  title: string;
  @Field(type=>NoteType)
  type: NoteType;
  @Field({nullable:false})
  description:string
  @Field({nullable:true})
  coverImage!:string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}



@ObjectType()
export class NotesPayload {
  @Field(()=>Note)
  notes?: [Note];
  @Field()
  count?: number;
}