// import { Model, model, Schema } from 'mongoose';
// import { IDriver } from '../interfaces/Driver';

// const DriverSchema = new Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   phoneNumber: { type: Number, required: true, unique: true },
//   nationalId: { type: Number, required: true, unique: true, min: 16 },
//   drivingLicense: { type: String, required: true, min: 16 },
//   isOwner: { type: Boolean, default: false },
//   vehicleType: { type: String, required: true },
//   plateNumber: { type: String, required: true, unique: true },
//   insuranceExpiresOn: { type: Date, required: true },
//   vehicleInsurance: { type: String, required: true },
//   workingRegions: [{ region: { type: String }, long: { type: String }, lat: { type: String } }],
//   availableTime: { type: String, required: true },
//   paymentMethod: { type: String, required: true },
//   accountNumber: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// export const Driver: Model<IDriver> = model('Driver', DriverSchema);
