const { sendConfirmationEmail } = require("../../utils/emailConf");
const express = require("express");
const resendEmailPost = express();

resendEmailPost.post("/ResendEmail", async (req, resp) => {
  let result = await sendConfirmationEmail(req.headers.email);
  return resp.send(result);
});

module.exports = { resendEmailPost };
