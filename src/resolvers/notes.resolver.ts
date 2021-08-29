import NoteModel   from '../database/models/Note';
import ShipmentModel from '../database/models/Shipment'
import { Args,Arg, Mutation,Authorized, Query,Ctx, Resolver, UseMiddleware } from 'type-graphql';
import {
  ErrorResponse,
} from '../helpers/common.helper';

import {
 createNoteMiddl,updateNoteMiddl,verifyShipmentToNote
} from '../middlewares/note/note.middleware';
import { CreateNoteArgs,GetNotesArgs,UpdateNoteArgs } from '../schemas/notes/args';
import Note, { NotesPayload} from '../schemas/notes';


@Resolver()
export default class NoteResolver {
  @Mutation((returns) => Note, { nullable: true })
  @UseMiddleware(
 createNoteMiddl,
//  verifyShipmentToNote
  )
  async createShipmentNote( @Args()args: CreateNoteArgs) {
    const {shipmentId,noteData}=args
    try {
     const data = await new NoteModel ({
        ...noteData,
      }).save();
     
    
      
const ship = await ShipmentModel.findOneAndUpdate({_id:shipmentId},{ $push: { "notes": data._id } },
{new:true})

      return data;
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while creating a note .' },
      });
    }
  }

  

  @Authorized("admin")
  @Query((returns) => NotesPayload, { nullable: true })
  
  async getNotes( @Args() {  skip, take }: GetNotesArgs) {
    try {
      const notes =await  NoteModel.find({
    
      }).skip(skip).limit(take);
      
      
      const count =await  NoteModel.countDocuments({
      
      }).skip(skip).limit(take);
    
      return {
        notes,
        count,
      };
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching note.' },
      });
    }
  }
  @Authorized("admin", "operator")
  @Query((returns) =>Note, { nullable: true })
 
  async getOneNote(@Arg("_id") _id: string) {
    try {
      
      const note = await  NoteModel.findById({
      _id
      });
      if (note === undefined) {
        return ErrorResponse({
          errors: { error: 'note  not found .' },
        });
      }
      return note
      
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching note  .' },
      });
    }
  }
  

  @Authorized()
  @Mutation((returns) => Note, { nullable: true })
  @UseMiddleware(updateNoteMiddl)
  async NoteUpdate(@Args() args: UpdateNoteArgs,@Ctx() ctx: any) {
    try{
      const {updates,noteId}=args
   
  
    const updatedUser = await NoteModel.findOneAndUpdate({id:noteId},
      {updates},
      {new:true})
    return updatedUser;
      }catch(error){
  
  return ErrorResponse({ errors: { error: error.message } });
      } 
    
  }
  
  @Authorized("admin" )
  @Mutation((returns) => String, { nullable: true })
 
  async deleteNote(@Arg("_id") _id: string) {
    try {
      
      await  NoteModel.findOneAndDelete({
      _id
      });
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting Note  .' },
      });
    }
  }
}