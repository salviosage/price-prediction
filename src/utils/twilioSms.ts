const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendSMS = (to: string,body:string) => {
  const client = require('twilio')(accountSid, authToken);
  
  client.messages
  .create({
     body:body,
     from: '+14016487725',
     to:to
   })
  .then(message => console.log(message.sid));
}

export default sendSMS