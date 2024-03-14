const { verifyToken } = require("../../utils/token");
const express = require("express");
const deleteAccount = express();
const User = require("../../db/User");

deleteAccount.delete("/deleteAccount", verifyToken, async (req, resp) => {
  let deleteAccount = await User.deleteOne({ _id: req.body._id });
  resp.send(deleteAccount);
});

module.exports = { deleteAccount };
