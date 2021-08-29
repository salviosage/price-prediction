import { model, Schema } from 'mongoose';
import { IClient } from '../interfaces/Client';
import { documentSchema } from './Common'
import {ContactSchema} from './Common'


const clientSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    shipment_orders: [{
        type: Schema.Types.ObjectId,
        ref: 'ShipmentOrders',
    }],
    contact_persons: [{type: ContactSchema, required:true }],
    documents: { type: [documentSchema], required: false },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

export default model<IClient >('Client', clientSchema);