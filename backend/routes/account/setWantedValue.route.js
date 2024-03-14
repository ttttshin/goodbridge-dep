const { verifyToken } = require("../../utils/token");
const express = require("express");
const setWantedValue = express();
const User = require("../../db/User");

setWantedValue.post("/setWantedValue", verifyToken, async (req, resp) => {
  const user = JSON.parse(req.body.user);
  const setWantedValues = await User.updateOne(
    { _id: user._id },
    { $set: { wantedValues: req.body.wantedValues } }
  );

  resp.send(setWantedValues);
});

module.exports = { setWantedValue };
