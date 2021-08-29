
import { SignupArgs } from '../modules/graphql/schemas/users/args';
import jwt from 'jsonwebtoken'

const sgMail = require('@sendgrid/mail')
import transporter from '../App'
const secret=process.env.IRONJI_SECRET_KEY || ''
const expiresIn=process.env.AUTH_TOKEN_EXPIRY
export const createToken = (data:SignupArgs) => {
  const { userType, email } = data

  return jwt.sign({ userType, email }, secret, {
    expiresIn,
  })
}
export const getUserFromToken = (token:string) => {
  try {
    return jwt.verify(token, secret)
  } catch (e) {
    return {}
  }
}



  export const  sendEmail =async  ( to:string|undefined, subject:string, text:string ) => {
    const options = {
      from: `${process.env.ACCOUNT_EMAIL}`,
      to:to,
      subject: subject,
      html: text
      
    }
     await transporter.sendMail(options, (err:any, info:any)=>{
            if(err){
                console.log(err)
            }
            else {
                console.log(info)
            }
        });
    return true
  }

const { ACCOUNT_EMAIL, SENDGRID_API_KEY } = process.env
sgMail.setApiKey(SENDGRID_API_KEY)

export const sendEmailSendgrid = async ( to:string|undefined, subject:string,html:string) => {
  const options = {
    from: "salviosage@gmail.com",
    to,
    subject,
    // text,
    html,
  }
  
  await  sgMail.send(options, (err:any, info:any)=>{
    if(err){
        console.log('error',err)
        return false
    }
    else {
        console.log('info',info)
    }
});
return true
}

 