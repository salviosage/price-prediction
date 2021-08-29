
import jwt from 'jsonwebtoken'
const secret=process.env.IRONJI_SECRET_KEY || ''



  export const CheckUser = async (request:any) => {
    
    try {
      const token =request.headers.authorization || ''
        if(!token || token===null){
          return false 
        }else {
          return await jwt.verify(token , secret)
        }
     
      
    } catch (error) {
      console.log(error.message)
      return false
    }
  };

  export const GetUserFromToken:any = async (token) => {
    
    try {
      
        if(!token || token===null){
          return false 
        }else {
          return await jwt.verify(token , secret)
        }
     
      
    } catch (error) {
      console.log(error.message)
      return false
    }
  };