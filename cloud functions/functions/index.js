const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require('express');
const app = express();
const cors = require('cors')({origin: true});
app.use(cors);

const nodemailer = require("nodemailer");

admin.initializeApp();

exports.app = functions.https.onRequest(app);

app.get('/CreatePartnerUser', async (req, res) => {
  var username = req.query.username;
  var email = req.query.email;
  var password = req.query.password;
  try{
    var userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: username,
    });
    var data = {
      code :200,
      result : userRecord.uid,
    };
    var s = await SendEmail(email,password);
    console.log("Mail Result",s);
    res.status(200).send(data);
  }
  catch(ex){
    var data = {
      code :401,
      result : ex.message,
    };
    res.status(200).send(data);
  }
})

async function SendEmail(to,password){
  var senderEmail = "usamabusiness7861@gmail.com";
  var senderPass = "1Q_2w3e4r";
  const authData= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: senderEmail,
      pass: senderPass,
    },
  });
  var html = `<p>Please login with these credentials and change your password first
  otherwise you will not be able to perform any operations</p>
  <p>Email : ${to}</p>
  <p>Password : ${password}</p>
  `;
  return authData.sendMail({
      from: senderEmail,
      to: ["ubf5577@gmail.com",to],
      subject: "Welcome User",
      text: "",
      html: html,
    });
}
