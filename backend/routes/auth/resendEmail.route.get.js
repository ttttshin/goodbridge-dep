const express = require("express");
const resendEmailGet = express();
const User = require("../../db/User");

resendEmailGet.get("/ResendEmail", async (req, resp) => {
  let result = await User.findOne({ email: req.headers.email });
  if (result) {
    return resp.send(result.verifiedAccount);
  }
});

module.exports = { resendEmailGet };
