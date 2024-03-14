const { verifyToken } = require("../../utils/token");
const express = require("express");
const getPotentialMatches = express();
const User = require("../../db/User");

getPotentialMatches.get(
  `/getPotentialMatches/:id`,
  verifyToken,
  async (req, resp) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return resp.status(404).json({ error: "User not found" });
      }

      const visited = user.visited;
      let nameArray = [];
      for (let i = 0; i < user.potentialMatches.length; i++) {
        let otherUser = await User.findById(user.potentialMatches[i]);
        if (otherUser && otherUser._id && !visited.includes(otherUser._id)) {
          nameArray.push({
            name: otherUser.name,
            email: otherUser.email,
            values: otherUser.values,
            id: otherUser._id,
            bio: otherUser.bio,
            location: otherUser.location,
          });
        }
      }
      resp.send(nameArray);
    } catch (error) {
      console.error("Error in getPotentialMatches:", error);
      resp.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = { getPotentialMatches };
