var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

router.post('/', function(req, res, next) {

  var emailList = req.body.emailList;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER,
      pass: process.env.GMAIL
    }
  });
  var mailOptions = {
    from: process.env.SENDER,
    to: emailList,
    subject: 'New Challenge Added',
    text: "It's time to earn some points! A new challenge has been added to the Vanguard Tech App!"
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

module.exports = router;
