import { Resolver, Mutation, Args,Arg,Authorized, UseMiddleware, Query } from 'type-graphql';
import { CreateNoteResponse,Note ,NoteModel , NotesResponse} from '../schemas/notes/notes.schema';
import {ShipmentModel} from '../schemas/shipment/shipment.schema'
import {TruckOrderModel} from '../schemas/truckOrder/truck.order.schema'
import {CreateNoteArgs,UpdateNoteArgs,DeleteNoteArgs,GetNotesArgs} from '../schemas/notes/args'
import { ErrorResponse } from '../../helpers/users/users.helper';
import {NoteToType } from '../schemas/common'



@Resolver()
export default class NoteResolver {
  @Authorized(["admin", "super_admin"])
  @Query((returns) => NotesResponse, { nullable: true })
  
  async GetNotes( @Args() {  skip, take }: GetNotesArgs) {
    try {
      const Notes =await  NoteModel.find({
      
      }).skip(skip).limit(take);
      console.log(Notes.length)
      // return Notes
      
      const count =await  NoteModel.countDocuments({
      
      }).skip(skip).limit(take);
  
      return {
        Notes,
        count,
      };
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while Featching shipment.' },
      });
    }
  }
  @Authorized(["admin", "super_admin"])
  @Query((returns) => Note, { nullable: true })
 
  async GetOneNote(@Arg("_id") _id: string) {
    try {
      
      const note = await  NoteModel.findById({
      _id
      });
      if (note === undefined) {
        return ErrorResponse({
          errors: { error: 'Note not found .' },
        });
      }
      return note 
      
    } catch (error) {
      console.log('error', error);
      return ErrorResponse({
        errors: { error: 'An error occurred while fetching note .' },
      });
    }
  }
  @Authorized(["admin", "super_admin"])
  @Mutation((returns) => String, { nullable: true })
 
  async DeleteNote(@Arg("_id") _id: string) {
    try {
      
      await  NoteModel.findOneAndDelete({
      _id
      });
      
      return "deleted sucessfully"
      
    } catch (error) {
      
      return ErrorResponse({
        errors: { error: 'An error accured while deleting Note .' },
      });
    }
  }
  @Authorized()
  @Mutation((returns) => CreateNoteResponse, { nullable: true })
 
  async CreateNote(@Args() args: CreateNoteArgs) {
    let { refId,inputs } = args;
    let {to}=inputs

    try {
      let refdoc
      if (to== NoteToType.SHIPMENT){
        refdoc= await ShipmentModel.findById(refId)
      }else if (to== NoteToType.TRUCK_ORDER){
        refdoc= await TruckOrderModel.findById(refId)
      }
      
      const note=await new NoteModel({
        ...inputs
      }).save();

      if (to && refdoc){
      
        // await refdoc.notes== [note._id,...refdoc.notes ]
        // refdoc.save()
      }
      
      return {
        Note:note,
        message: 'your note has been created successfully.',
      };
    } catch (error) {
      console.log(error)
      return ErrorResponse({
        errors: { error: "error.message "},
      });
    }
  }
  @Authorized(["admin", "super_admin"])
  @Mutation((returns) => CreateNoteResponse, { nullable: true })
  async updateNote(@Args() args: UpdateNoteArgs) {
    let { noteId,updates } = args;

    try{
    updates={...updates}
    const updatedOrder=NoteModel.findOneAndUpdate({_id:noteId},updates,{new:true})
    
      return {  Note:updatedOrder,message: 'shipment updated sucesssfully' };
    }catch(error){

return ErrorResponse({ errors: { error: error.message } });
    }
    


    
  }
} 