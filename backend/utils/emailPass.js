const jwt = require("jsonwebtoken");
const jwtSecret = "goodbridgeuwu";
const nodemailer = require("nodemailer");

function sendPasswordEmail(address) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreply.goodbridge@gmail.com", //backup email is noreply.goodbridge@gmail.com/mxvppgkbetbzhwju or goodbridge.noreply@gmail.com/iuvyeakbrrszmyto
      pass: "mxvppgkbetbzhwju", //password is Goodbridge123
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const mail = address;
    const emailToken = jwt.sign(
      {
        mail,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    const url = `${process.env.BACKEND_URL}/confirmationPassword/${emailToken}`;
    transporter.sendMail({
      from: '"GoodBridge 👻" <noreply.goodbridge@gmail.com>',
      to: mail,
      subject: "Reset Password ✔",
      text: "Please reset your password:",
      html: `Please click this email to Reset your password: <a href="${url}">${url}</a>`,
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
    sendPasswordEmail,
};
