const { verifyToken } = require("../../utils/token");
const express = require("express");
const newEmail = express();
const User = require("../../db/User");

newEmail.get("/email/:newemail", verifyToken, async (req, resp) => {
  let user = await User.findOne({ email: req.params.newemail }).select("email");
  if (user) {
    resp.send({ message: "exists" });
  } else {
    resp.send({ message: "isavailable" });
  }
});

module.exports = { newEmail };
