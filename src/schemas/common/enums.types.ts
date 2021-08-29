import { registerEnumType } from "type-graphql";

  export  enum Gender {
    MALE = 'male',
    FEMALE = 'female'
  }

  export  enum DealStatus {
    INITIATED="Initiated",
    PROGRESSED="processed",
    CREATED="Created"
  }
  export enum AccountStatusTypes {PENDING='PENDING', ACTIVE='ACTIVE',SUSPENDED= 'SUSPENDED',CLOSED='CLOSED',INACTIVE='INACTIVE'};
  export  enum UserType {
    ADMIN='ADMIN', SUPER_ADMIN='SUPER_ADMIN',EMPLOYEE='EMPLOYEE',NOT_ASSIGNED='NOT_ASSIGNED',DRIVER='DRIVER',OPERATOR='OPERATOR'
  }
  export  enum DepartmentType {
    EXTERNAL_OPS="External_Ops",
    BOARD="Board",
    ENGINEERING="Engineering",
    ADMINISTRATION="Administration",
    INTERNAL_OPS="Internal_Ops",
    SALES="Sales",
    UNASIGNED="Unassigned"
  }
  export  enum NoteType {
    CHANGEDROPOFF="ChangeDropoff",
    CHANGETIME="ChangeTime",
    EMERGENCIES="Emergencies",
    DEALDONE="DealDone",
    DEALCLOSED="DealClosed",
    DEALOPENED="DealOpened",
    DEFAULTNOTE="DefaultNote"
  }

  export  enum RoleLevelType {
    One="One",
    Two="Two",
    Three="Three",
    Four="Four",
    Five="Five",
    Six="Six",
    Seven="Seven"
  }
  export  enum WeightRangeType {
    _0_25_kg="0 to 25 kg",
    _26_50_kg="26 to50 kg",
    _51_100_kg="21 to 100 kg",
    _101_300_kg="101 to 300 kg",
    _301_500_kg="301 to 500 kg",
    _501_kg_1_ton="501 kg to 1 ton",
    _1_ton_5_ton="1 to 5 ton",
    _5_ton_10_ton="5 to 10 ton",
    _10_ton_obove="10 ton and above"
  }
  export  enum CarTypeEn {
    Fuso="Fuso", Lifan="Lifan", Daihatsu="Daihatsu", Trailer="Trailer", Pickups="Pickups", Motorcycle="Motorcycle"
  }
  export  enum PaymentMethodEn {
    MobileMoney="MobileMoney", Bank="Bank", Cash="Cash", Card="Card"
  }
  registerEnumType(CarTypeEn, {
    name: "CarTypeEn"
  });
  registerEnumType(RoleLevelType, {
    name: "RoleLevelType"
  });
  registerEnumType(PaymentMethodEn, {
    name: "PaymentMethodEn"
  });
  registerEnumType(WeightRangeType, {
    name: "WeightRangeType"
  });
  registerEnumType(NoteType, {
    name: "NoteType"
  });
  registerEnumType(DealStatus, {
    name: "DealStatus"
  });
  registerEnumType(Gender, {
    name: "Gender"
  });

  registerEnumType(UserType, {
    name: "UserType",
    description: "Users Role Types", 
  });
  registerEnumType(DepartmentType, {
    name: "DepartmentType",
    description: "The department Types", 
  });
  