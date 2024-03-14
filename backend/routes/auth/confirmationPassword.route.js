const express = require("express");
const confirmationPassword = express();
const jwt = require("jsonwebtoken");
const jwtSecret = "goodbridgeuwu";

confirmationPassword.get("/confirmationPassword/:token", async (req, res) => {
  try {
    // eslint-disable-next-line
    const decoded = jwt.verify(req.params.token, jwtSecret);
  } catch (e) {
    res.send("error");
  }
  return res.redirect(
    `${process.env.FRONTEND_URL}/forgotPasswordChange?token=${req.params.token}`
  );
});

module.exports = { confirmationPassword };
