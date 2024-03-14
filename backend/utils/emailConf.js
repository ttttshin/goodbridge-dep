const jwt = require("jsonwebtoken");
const jwtSecret = "goodbridgeuwu";
const nodemailer = require("nodemailer");

function sendConfirmationEmail(address) {
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

    const url = `${process.env.BACKEND_URL}/confirmation/${emailToken}`;
    transporter.sendMail({
      from: '"GoodBridge 👻" <noreply.goodbridge@gmail.com>',
      to: mail,
      subject: "Email Confirmation ✔",
      text: "Please confirm your email address:",
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  sendConfirmationEmail,
};
