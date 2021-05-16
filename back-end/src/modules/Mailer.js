import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import mailConfig from '@/config/mail';

const Mailer = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: mailConfig.auth,
});

Mailer.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.hbs',
      partialsDir: './src/resources/mail',
      layoutsDir: './src/resources/mail',
      defaultLayout: null,
    },
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html',
  }),
);

export default Mailer;
