const { verifyToken } = require("../../utils/token");
const express = require("express");
const updateEmail = express();
const User = require("../../db/User");
const validator = require("validator");

updateEmail.put("/updateEmail", verifyToken, async (req, resp) => {
  if (!req.body.newemail) {
    return resp.status(400).send({ message: "Please enter email" });
  }
  if (!validator.isEmail(req.body.newemail)) {
    return resp.status(400).send({ message: "Please enter a valid email" });
  }
  let result = await User.findOneAndUpdate(
    { email: req.body.oldemail },
    { $set: { email: req.body.newemail } },
    { new: true }
  );
  resp.send(result);
});

module.exports = { updateEmail };
