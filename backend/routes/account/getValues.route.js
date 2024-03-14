const { verifyToken } = require("../../utils/token");
const express = require("express");
const getValues = express();
const User = require("../../db/User");

getValues.get(`/getValues/:id`, verifyToken, async (req, resp) => {
  const user = await User.findOne({ _id: req.params.id });
  resp.send(user.values);
});

module.exports = { getValues };
