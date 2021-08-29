import { mailFormat } from '../schemas/emailNotifier/mailFormat';
import { content } from '../template/email.content';
import { orderNotificationArgs } from '../schemas/emailNotifier/args';
const emailGenerator = (data:orderNotificationArgs):mailFormat => {
    return {
      from: `${process.env.ACCOUNT_EMAIL}`,
      to: `${process.env.OPERATORS_EMAILS}`,
      subject: 'Check Now!!  A NEW ORDER IS PLACED ON IRONJI',
      html: content({...data})
    };
  };
  export default emailGenerator;