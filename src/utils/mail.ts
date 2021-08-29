import { SignupArgs } from '../modules/graphql/schemas/users/args';
import jwt from 'jsonwebtoken'

const sgMail = require('@sendgrid/mail')
import transporter from '../App'
const { SENDGRID_EMAIL, SENDGRID_API_KEY } = process.env
sgMail.setApiKey(SENDGRID_API_KEY)


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



export const sendEmailSendgrid = async ( to:string|undefined, subject:string,html:string) => {
  const options = {
    from: SENDGRID_EMAIL,
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