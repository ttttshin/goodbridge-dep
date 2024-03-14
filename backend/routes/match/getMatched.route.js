const { verifyToken } = require("../../utils/token");
const express = require("express");
const getMatched = express();
const User = require("../../db/User");

getMatched.get(`/getMatched/:id`, verifyToken, async (req, resp) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return resp.status(404).json({ message: "User not found" });
    }
    
    let nameArray = [];
    for (let i = 0; i < user.matches.length; i++) {
      let tempUser = await User.findById(user.matches[i]);
      if (!tempUser) {
        console.log(`User with ID ${user.matches[i]} not found`);
        continue;
      }
      
      nameArray.push({
        name: tempUser.name,
        email: tempUser.email,
        values: tempUser.values,
        wantedValues: tempUser.wantedValues,
        id: tempUser._id,
      });
    }
    
    resp.send(nameArray);
  } catch (error) {
    console.error("Error in getMatched route:", error);
    resp.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { getMatched };
