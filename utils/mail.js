const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.firstName = user.name.split(' ')[0];
    this.to = user.email;
    this.url = url;
    this.from = `CookieDaze <${process.env.SENDGRID_EMAIL}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // SENDGIRD
      return nodemailer.createTransport({
        service: 'sendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 1) Render html to pug
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // 2) Defind the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };
    // 3) Send the mail

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the CookieDaze family !');
  }

  async sendRestPassword() {
    await this.send('resetPassword', 'Reset your password');
  }
};
