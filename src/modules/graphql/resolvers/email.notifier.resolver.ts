import {Args, Query, Resolver} from 'type-graphql';
import {orderNotificationArgs} from '../schemas/emailNotifier/args';
import transporter from '../../../App';
import emailGenerator from '../../../utils/emailGenerator';
import { notification } from '../schemas/emailNotifier/notification.schema';

@Resolver()
export default class {

    @Query((returns) => notification , {nullable: true})
     static async notifyOperations(@Args() args:orderNotificationArgs){
       await transporter.sendMail(emailGenerator(args), (err:any, info:any)=>{
            if(err){
                console.log(err)
            }
            else {
                console.log(info)
            }
        });

        return {
            message: 'success ...'
        }

    }

}