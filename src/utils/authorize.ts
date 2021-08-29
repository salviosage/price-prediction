import {AuthChecker} from 'type-graphql'
import {UserModel} from '../modules/graphql/schemas/users/users.schema'
import {getUserFromToken} from './auth'
import jwt from 'jsonwebtoken'
const secret=process.env.IRONJI_SECRET_KEY || ''

export const customAuthChecker: AuthChecker<any> = async (
    { root, args, context, info },
    roles,
  ) => {
    const Authorization = context.request.get('Authorization')
    if (!Authorization || Authorization==="null") {
      return false
    } 
    else{
        let user =null
        
             user = await jwt.verify(Authorization, secret)
  
     
    //    if(user){
    //        const{userType}=user||null
    //     let isUserAllowed = null;
        
    //     if (Array.isArray(roles)) {
    //       isUserAllowed = roles.some(role => role === userType);
    //     } else {
    //       isUserAllowed = userType === roles;
    //     }
    //        if (isUserAllowed )}
    //        return true 
    //    }
    }
    
  

    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  
    return true; // or false if access is denied
  };



  export const CheckUser = async (request:any) => {
    
    try {
      const token =request.headers.authorization || ''
        if(!token || token===null){
          return false 
        }else {
          return await jwt.verify(token , secret)
        }
     
      
    } catch (error) {
      console.log(error)
      return false
    }
  };