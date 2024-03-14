const { verifyToken } = require("../../utils/token");
const express = require("express");
const getPersonalDetails = express();
const User = require("../../db/User");

getPersonalDetails.get(
  `/getPersonalDetails/:id`,
  verifyToken,
  async (req, resp) => {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      resp.status(200).json({
        location: user.location,
      });
    }
  }
);

module.exports = { getPersonalDetails };
