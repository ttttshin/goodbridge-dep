const { verifyToken } = require("../../utils/token");
const express = require("express");
const setPersonalDetails = express();
const User = require("../../db/User");

setPersonalDetails.post(
  "/setPersonalDetails",
  verifyToken,
  async (req, resp) => {
    const user = JSON.parse(req.body.user);
    const setLocation = await User.updateOne(
      { _id: user._id },
      { $set: { location: req.body.location } }
    );
    resp.send(setLocation);
  }
);

module.exports = { setPersonalDetails };
