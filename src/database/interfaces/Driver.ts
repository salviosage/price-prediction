import { Document } from 'mongoose';

export interface IDriver extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  nationalId: number;
  drivingLicence: string;
  isOwner: boolean;
  vehicleType: string;
  plateNumber: string;
  insuranceExpiresOn: string;
  vehicleInsurance: string;
  workingRegions: [
    {
      long: string;
      lat: string;
    },
  ];
  availableTime: string;
  paymentMethod: string;
  accountNumber: number;
}

interface IPermit {
  gender: string;
  permitClass: string;
  dateOfBirth: Date;
  permitLink: string;
  expirationDate: Date;
}
interface IInsurance {
  insuranceId: string;
  insuranceNumber: string;
  provider: string;
  documentLink: string;
  expiredDate: Date;
}
