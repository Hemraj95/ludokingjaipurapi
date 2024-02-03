var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'orbotsoftwares@gmail.com',
    pass: 'orbot@1212'
  }
});

var mailOptions = {
  from: 'orbotsoftwares@gmail.com',
  to: 'ashfakshikh@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});