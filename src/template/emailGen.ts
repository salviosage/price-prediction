export const WelcomeEmail=(content)=>{ 
    return`
<div style="text-align: center; border: 2px solid #C4C4C4; width: 100%; margin: auto; border-radius: 10px;">
<img style="margin-top:30px;" src="https://res.cloudinary.com/depkswexz/image/upload/v1577364678/ironjiWebImage/ironji_logo_jhbrrm.png" />
<h2 style="margin-top: 30px;">Welcome to Ironji ${content.username}</h2>

<div style=" width: 50%; margin: auto; margin-top: 50px; text-align: center;">
    
    
    <p style="margin-top: 30px; margin-bottom: 70px;">
<p>Your Ironji OTP is <b style="font-size: 15px;">${content.otp}</b></p>
        
        
    </p>
</div>
</div>`

}
export const MFAEmail=(content)=>{ 
    return`
<div style="text-align: center; border: 2px solid #C4C4C4; width: 100%; margin: auto; border-radius: 10px;">
<img style="margin-top:30px;" src="https://res.cloudinary.com/depkswexz/image/upload/v1577364678/ironjiWebImage/ironji_logo_jhbrrm.png" />
<h2 style="margin-top: 30px;">Welcome back ${content.username}</h2>

<div style=" width: 50%; margin: auto; margin-top: 50px; text-align: center;">
    
    
    <p style="margin-top: 30px; margin-bottom: 70px;">
<p>Your Ironji MFA OTP is <b style="font-size: 15px;">${content.otp}</b></p>
        
        
    </p>
</div>
</div>`

}