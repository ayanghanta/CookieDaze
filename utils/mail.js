const nodemailer = require('nodemailer');

const sendEmail = async function (options) {
  const transposter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailoptions = {
    from: 'Ayan Ghanta <ayanghanta674@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transposter.sendMail(mailoptions);
};

module.exports = sendEmail;
