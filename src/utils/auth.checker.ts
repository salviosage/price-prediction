import {AuthChecker} from 'type-graphql'
import {UserModel} from '../modules/graphql/schemas/users/users.schema'
export const customAuthChecker: AuthChecker<any> = async(
    { root, args, context, info },
    roles,
  ) => {
      const {user} =context
         if(user){
           const{userType,email}=user||null
           const foundUser=await UserModel.find({email})
         
           if (foundUser.length==0){
             return false 
           }
        let isUserAllowed = null;
      

        if (roles.length==0 && userType){
      
          isUserAllowed= true
        }
        if (Array.isArray(roles) && roles.length) {
    
          isUserAllowed = roles.some(role => role === userType);
        } else if(roles.length) {
          
          isUserAllowed = userType === roles;
        }
          if (isUserAllowed ){
            return true 
          }
          
         return false  
       }

    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  console.log('no user token provided ')
    return false; // or false if access is denied
  };