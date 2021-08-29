
import { model, Schema } from 'mongoose';
import { IDocument } from '../interfaces/Documet';


export const documentSchema = new Schema(
    {
        documentId: { type: String, required: true },
        type: { type: String, required: true },
        url: { type: String, required: true },
        title: { type: String, required: true },
        verified: { type: Boolean, default: false }
    }
);
export default model<IDocument>('Driver', documentSchema);