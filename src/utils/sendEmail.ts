import dotenv from 'dotenv'
const sgMail = require('@sendgrid/mail')
dotenv.config()
const {SENDGRID_EMAIL, SENDGRID_API_KEY } = process.env
sgMail.setApiKey(SENDGRID_API_KEY)

/**
 *  Sends an email to user
 *
 * @param {string} to email address where to send mail
 * @param {string} subject of the email
 * @param {string} html content of the email
 */
export const SendEmail = ( to:string, subject:string,  html:string) => {
  const options = {
    from: SENDGRID_EMAIL,
    to,
    subject,
    html,
  }
  return sgMail.send(options).then(
    () => {},
    error => {
      if (error.response) {  
          console.log(error)
      }
    }
  ) 
}