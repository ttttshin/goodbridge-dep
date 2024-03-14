const {sendPasswordEmail} = require("../../utils/emailPass");
const express = require("express");
const passwordEmail = express();


passwordEmail.post("/sendPasswordEmail", async (req, resp) => {
  let result = await sendPasswordEmail(req.headers.email);
  return resp.send(result);
});

module.exports = {passwordEmail};
