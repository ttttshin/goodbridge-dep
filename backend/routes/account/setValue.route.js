const { verifyToken } = require("../../utils/token");
const express = require("express");
const setValue = express();
const User = require("../../db/User");

setValue.post("/setValue", verifyToken, async (req, resp) => {
  const user = JSON.parse(req.body.user);
  const setValues = await User.updateOne(
    { _id: user._id },
    { $set: { values: req.body.values } }
  );

  resp.send(setValues);
});

module.exports = { setValue };
