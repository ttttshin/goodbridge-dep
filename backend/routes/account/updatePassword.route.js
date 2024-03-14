const { hashNSalt } = require("../../utils/password");
const { verifyToken } = require("../../utils/token");
const express = require("express");
const updatePassword = express();
const User = require("../../db/User");
const validator = require("validator");

updatePassword.put("/updatePassword", verifyToken, async (req, resp) => {
  if (!req.body.newPassword) {
    return resp.status(400).send({ message: "Please enter password" });
  }
  if (!validator.isStrongPassword(req.body.newPassword)) {
    return resp.status(400).send({
      message:
        "Password must be >8 characters long, have at least one number, lowercase letter, uppercase letter and one special character",
    });
  }
  let safePassword = hashNSalt(req.body.newPassword);
  let user = await User.updateOne(
    { _id: req.body.id },
    { $set: { password: safePassword } }
  );
  resp.send(user);
});

module.exports = { updatePassword };
