const { verifyToken } = require("../../utils/token");
const express = require("express");
const getBio = express();
const User = require("../../db/User");

getBio.get(`/getBio/:id`, verifyToken, async (req, resp) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    const bio = { bio: user.bio };
    resp.send(bio);
  }
});

module.exports = { getBio };
