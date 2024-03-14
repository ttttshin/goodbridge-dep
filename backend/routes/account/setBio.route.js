const { verifyToken } = require("../../utils/token");
const express = require("express");
const setBio = express();
const User = require("../../db/User");

setBio.post("/setBio", verifyToken, async (req, resp) => {
  const user = JSON.parse(req.body.user);
  const setBio = await User.updateOne(
    { _id: user._id },
    { $set: { bio: req.body.bio } }
  );

  resp.send(setBio);
});

module.exports = { setBio };
