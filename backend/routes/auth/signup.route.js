const { hashNSalt } = require("../../utils/password");
const { sendConfirmationEmail } = require("../../utils/emailConf");
require("dotenv").config();
const express = require("express");
const signup = express();
const User = require("../../db/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const validator = require("validator");


signup.post("/signup", async (req, resp) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return resp
      .status(400)
      .send({ message: "Please enter name, email and password" });
  }
  if (req.body.name.length < 2 || req.body.name.length > 50) {
    return resp
      .status(400)
      .send({ message: "Name must be between 2 and 50 characters long" });
  }
  // disallow spaces in name
  if (/\s/.test(req.body.name)) {
    return resp.status(400).send({ message: "Name cannot contain spaces" });
  }
  // disallow special characters in name
  if (!/^[a-zA-Z0-9_]+$/.test(req.body.name)) {
    return resp.status(400).send({ message: "Name cannot contain special characters, except underscore" });
  }
  // disallow consecutive underscores in name
  if (req.body.name.includes("__")) {
    return resp.status(400).send({ message: "Name cannot contain consecutive underscores" });
  }
  if (!validator.isEmail(req.body.email)) {
    return resp.status(400).send({ message: "Please enter a valid email" });
  }
  if (!validator.isStrongPassword(req.body.password)) {
    return resp.status(400).send({
      message:
        "Password must be >8 characters long, have at least one number, lowercase letter, uppercase letter and one special character",
    });
  }
  req.body.email = req.body.email.toLowerCase();
  let emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return resp.status(400).send({ message: "Email already exists" });
  }
  let user = new User(req.body);
  const hashedPassword = hashNSalt(user.password);
  user.password = hashedPassword;
  let result = await user.save();
  user = result.toObject();
  delete user.password;
  jwt.sign({ result }, jwtSecret, { expiresIn: "4h" }, (err, token) => {
    if (err) {
      return resp.status(401).json({ message: "Error in generating token" });
    }

    sendConfirmationEmail(user.email);

    return resp.send({ user, auth: token });
  });
});

module.exports = { signup };
