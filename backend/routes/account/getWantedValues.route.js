const { verifyToken } = require("../../utils/token");
const express = require("express");
const getWantedValues = express();
const User = require("../../db/User");

getWantedValues.get(`/getWantedValues/:id`, verifyToken, async (req, resp) => {
  const user = await User.findOne({ _id: req.params.id });
  resp.send(user.wantedValues);
});

module.exports = { getWantedValues };
