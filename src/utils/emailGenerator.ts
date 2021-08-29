import { mailFormat } from '../modules/graphql/schemas/emailNotifier/mailFormat';
import { content } from '../models/email.content';
import { orderNotificationArgs } from '../modules/graphql/schemas/emailNotifier/args';
const emailGenerator = (data:orderNotificationArgs):mailFormat => {
    return {
      from: `${process.env.ACCOUNT_EMAIL}`,
      to: `${process.env.OPERATORS_EMAILS}`,
      subject: 'Check Now!!  A NEW ORDER IS PLACED ON IRONJI',
      html: content({...data})
    };
  };
  export default emailGenerator;