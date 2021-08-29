import { MiddlewareFn } from 'type-graphql';
import Shipment from '../../database/models/Shipment'
import { ErrorResponse } from '../../helpers/common.helper';
import { CreateNoteValidator,UpdateNoteValidator } from '../../helpers/Note/note.helper';



export const verifyShipmentToNote: MiddlewareFn = async ({ args }, next) => {
  const { shipmentId} = args;
  
  const verify = await Shipment.find({id:shipmentId});
  console.log(verify)
  if (!verify) {
    return ErrorResponse({ errors: { error: "Shipment seems to not exist  ." } });
  }
  
  return next();
};


export const updateNoteMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const {updates}=args
  const { error: errors } = UpdateNoteValidator.validate(updates);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};
export const createNoteMiddl: MiddlewareFn<any> = async (
  { args },
  next,
) => {
  const a = JSON.parse(JSON.stringify(args))
  const {noteData}=a
  console.log(noteData)
  const { error: errors } = CreateNoteValidator.validate(noteData);
  if (errors) {
    return ErrorResponse({ errors: errors.details });
  }

  return next();
};
