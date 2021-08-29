

export const welcomeEmail = (content: string): string =>{ return `
<div style="text-align: center; border: 2px solid #C4C4C4; width: 50%; margin: auto; border-radius: 10px;">
        <img style="margin-top:30px;" src="https://res.cloudinary.com/depkswexz/image/upload/v1577364678/ironjiWebImage/ironji_logo_jhbrrm.png" />
        <h2 style="margin-top: 30px;">Welcome to Ironji</h2>
        <h3 style="margin-top: 30px;">Please confirm your email address :</h3>
        <div style=" width: 50%; margin: auto; margin-top: 50px; text-align: center;">
        
              
              <div class="order-btn" style="text-align: center;
    border: 2px solid #FF7F1F;
    padding: 19px;
    font-size: 20px;
    border-radius: 20px;
    width: 230px;
    margin-top: 56px;
    color: #FF7F1F;
    cursor: pointer;">
    <a href='${content}'>confirm your email</a></div>
          
          <p style="margin-top: 30px;align:center ">
               
              
            <b style="font-size: 15px;">if button is not working please use this link </b>
              <span> ${content}</span>
            </p>
               
    </div>
`
}
export const ResetPasswordLink = (content: string): string =>{ return `
<div style="text-align: center; border: 2px solid #C4C4C4; width: 50%; margin: auto; border-radius: 10px;">
        <img style="margin-top:30px;" src="https://res.cloudinary.com/depkswexz/image/upload/v1577364678/ironjiWebImage/ironji_logo_jhbrrm.png" />
        <h2 style="margin-top: 30px;">Rest Password</h2>
        <h3 style="margin-top: 30px;">Please reset your password by clicking button below, if it's not you who requested the reset password service, please ignore the message:</h3>
        <div style=" width: 50%; margin: auto; margin-top: 50px; text-align: center;">
        
              
              <div class="order-btn" style="text-align: center;
    border: 2px solid #FF7F1F;
    padding: 19px;
    font-size: 20px;
    border-radius: 20px;
    width: 230px;
    margin-top: 56px;
    color: #FF7F1F;
    cursor: pointer;">
    <a href='${content}' >Reset password</a></div>
          
          <p style="margin-top: 30px; ">
               
              
            <b style="font-size: 15px;">if button is not working please use this link </b>
              <span> ${content}</span>
            </p>
               
    </div>
`}
