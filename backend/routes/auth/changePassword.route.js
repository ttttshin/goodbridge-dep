const { hashNSalt } = require("../../utils/password");
const { verifyToken } = require("../../utils/token");
const express = require("express");
const changePassword = express();
const User = require("../../db/User");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const jwtSecret = "goodbridgeuwu";

changePassword.post(
  "/changePassword/:token",
  verifyToken,
  async (req, resp) => {
    if (!req.body.newPassword) {
      return resp.status(400).send({ message: "Please enter password" });
    }
    if (!validator.isStrongPassword(req.body.newPassword)) {
      return resp.status(400).send({
        message:
          "Password must be >8 characters long, have at least one number, lowercase letter, uppercase letter and one special character",
      });
    }
    try {
      const decoded = jwt.verify(req.params.token, jwtSecret);
      const mail = decoded.mail;

      const id = await User.findOne({ email: mail });
      let safePassword = hashNSalt(req.body.newPassword);
      let user = await User.updateOne(
        { _id: id },
        { $set: { password: safePassword } }
      );
      resp.send(user);
    } catch (e) {
      resp.send(e);
    }
  }
);

module.exports = { changePassword };
