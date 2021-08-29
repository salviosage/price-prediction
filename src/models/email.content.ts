import { orderNotificationArgs } from '../modules/graphql/schemas/emailNotifier/args'
import moment from 'moment';

export const content = (content: orderNotificationArgs): string =>{ return `
<div style="text-align: center; border: 2px solid #C4C4C4; width: 50%; margin: auto; border-radius: 10px;">
        <img style="margin-top:30px;" src="https://res.cloudinary.com/depkswexz/image/upload/v1577364678/ironjiWebImage/ironji_logo_jhbrrm.png" />
        <h2 style="margin-top: 30px;">New Order Is Placed</h2>
        <h3 style="margin-top: 30px;">Order Details:</h3>
        <div style=" width: 50%; margin: auto; margin-top: 50px; text-align: left;">
            <p style="margin-top: 30px;">
                <b style="font-size: 15px;">Names: </b>
                <span>${content.names}</span>
            </p>
            <p style="margin-top: 30px;">
                <b style="font-size: 15px;">Phone Number: </b> <span>${content.phoneNumber}</span>
            </p>
            <p style="margin-top: 30px;">
                <b style="font-size: 15px;">Weight Range: </b>
                <span>${content.weightRange}</span>
            </p>
            <p style="margin-top: 30px;">
                <b style="font-size: 15px;">Package Description: </b>
                <span>${content.packageDescription}</span>
            </p>
            <p style="margin-top: 30px;">
                <b style="font-size: 15px;">Pickup Location: </b>
                <span>${content.pickupLocation}</span>
            </p>
            <p style="margin-top: 30px;">
                <b style="font-size: 15px;">Destination: </b>
                <span>${content.destination}</span>
            </p>
            <p style="margin-top: 30px;">
                <b style="font-size: 15px;">Mode Of Payment: </b>
                <span>${content.paymentMethod}</span>
            </p>
            <p style="margin-top: 30px; margin-bottom: 70px;">
                <b style="font-size: 15px;">Order Time:</b>
                <span>${moment().format('MMMM Do YYYY, h:mm:ss a')}</span>
            </p>
        </div>
    </div>
`
}