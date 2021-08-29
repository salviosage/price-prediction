export interface IDoc {
    documentId: string;
    url: string;
    type: string;
    verified:boolean
  }

  export interface IContact {
    email: string;
    name:string;
    description:string;
    phoneNumber: string;
  }

  export interface IRegion {
    type: string;
    coordinates: [number];
    locationName: string;
  }
  export interface ITrucks {
    type: string;
    count: number;
  }
  export interface ISDrivers {
    driver: string;
    price: number;
  }