const express = require("express");
const confirmation = express();
const User = require("../../db/User");
const jwt = require("jsonwebtoken");
const jwtSecret = "goodbridgeuwu";

confirmation.get("/confirmation/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, jwtSecret);
    const mail = decoded.mail;
    await User.updateOne({ email: mail }, { $set: { verifiedAccount: true } });
  } catch (e) {
    res.send("error");
  }
  return res.redirect(`${process.env.FRONTEND_URL}/login`);
});

module.exports = { confirmation };
