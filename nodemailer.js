const nodemailer = require("nodemailer")
const { google } = require("googleapis")
var hbs = require('nodemailer-express-handlebars');

const Client_ID = "Client_ID"
const Client_secret = "Client_secret"
const REDIRECT_URI = "REDIRECT_URI"
const refresh_token = "refresh_token"

const oAuth2Client = new google.auth.OAuth2(
  Client_ID,
  Client_secret,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: refresh_token });

const sendMail = async (email,firstName) => {
  console.log("nodemail===", email,firstName)
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: '',
        clientId: Client_ID,
        clientSecret: Client_secret,
        refreshToken: refresh_token,
        accessToken: accessToken,
      },
    });


    const mailOptions = {
      from: '',
      to: email,
      subject: '<Subject>',
      text: '<Subject>',
      html:`Thank you for registering the <subject> <b>${firstName}</b>`,
      attachments: [{ filename: 'logo.png', path: './logo.png' , cid: 'unique@kreata.ee' }],
    };
   
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}


module.exports = sendMail;