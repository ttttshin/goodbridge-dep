const { verifyPassword } = require("../../utils/password");
require("dotenv").config();
const express = require("express");
const login = express();
const User = require("../../db/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

login.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    req.body.email = req.body.email.toLowerCase();
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return resp.send({ message: "No user found with this email" });
    }


    let dotheymatch = verifyPassword(
      user.password.hash,
      user.password.salt,
      user.password.iterations,
      req.body.password
    );


    if (user && dotheymatch) {
      user = user.toObject();
      delete user.password;

      const isAdmin = user.isAdmin ===true; 

      jwt.sign({ user }, jwtSecret, { expiresIn: "24h" }, (err, token) => {
        if (err) {
          return resp.send({ message: "Error in generating token" });
        }
        //this is new added response that will differentiate the user and admin 
        return resp.send({ user, auth: token, role: isAdmin ? 'admin' : 'user' });
      });
    } else {
      return resp.send({ message: "Incorrect email or password" });
    }
  } else {
    return resp.send({ message: "Please enter email and password" });
  }
});

module.exports = { login };
