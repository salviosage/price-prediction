import { ObjectType, Field,InputType} from "type-graphql";
import bcrypt from 'bcryptjs'
import { prop as Property} from "@typegoose/typegoose";
import { registerEnumType } from "type-graphql";




@ObjectType({ description: "The location interface" })
export class OLocation {
    @Field()
    @Property()
    public region: string;
    @Field()
    @Property()
    public lat?: string;
    @Field()
    @Property()
    public long?: string;
    @Field({ nullable: true })
    @Property()
    public street?: string;
}

@InputType({description:"The location inputType"} )
export class ILocation {
    @Field({ nullable: true })
    // to be added min and max lat and long 
    region: string;
    @Field({ nullable: true })
    lat?: string;
    @Field({ nullable: true })
    long?: string;
    @Field({ nullable: true })
    street?: string;
}

export const hashpassword = (next:any,password: string) => {
    
     bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
    
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return next(err)
    
          return  hash
        })
      })
  };

  export  enum Gender {
    MALE = 'male',
    FEMALE = 'female'
  }
  export  enum Roles {
    DRIVER = 'driver',
    ADMIN = 'admin',
    NORMAL_USER = 'normal_user',
    CLIENT= 'client',
    OPERATOR='operator',
    MANAGER='manager'
  }

  export  enum DealStatus {
    INITIATED="Initiated",
    PROGRESSED="processed",
    CREATED="Created"
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
  export  enum NoteToType {
    TRUCK_ORDER="truck_order",
    SHIPMENT="shipmente",
    PROSPECT="prospect",
    REMINDER="reminder",
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
  export  enum AuthType {
    phone="phone",
    email="email"
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
  registerEnumType(AuthType, {
    name: "AuthType"
  });
  registerEnumType(Gender, {
    name: "Gender"
  });
  registerEnumType(Roles, {
    name: "Roles"
  });
  registerEnumType(NoteToType, {
    name: "NoteToType"
  });
 
  
  
  