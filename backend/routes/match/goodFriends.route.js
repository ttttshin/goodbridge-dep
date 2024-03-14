const {
  GoodFriendsMatching,
  matchCheck,
} = require("../../utils/goodFriendsMatch");
const { verifyToken } = require("../../utils/token");
const express = require("express");
const goodFriends = express();
const User = require("../../db/User");

goodFriends.post("/GoodFriends", verifyToken, async (req, resp) => {
  const user = JSON.parse(req.body.user);
  // eslint-disable-next-line
  const visited = user.visited;
  const databaseValues = await User.find({});
  const theUser = await User.findById(user._id);
  const algorithmResults = GoodFriendsMatching(theUser, databaseValues, 1);
  for (let i = 0; i < algorithmResults.length; i++) {
    // eslint-disable-next-line
    matchedUser = await User.findById(algorithmResults[i]);
  }
  const result = await User.updateOne(
    { _id: theUser._id },
    { $set: { potentialMatches: algorithmResults } }
  );
  resp.send(result);
});

goodFriends.post("/ApproveMatch", verifyToken, async (req, resp) => {
  const user = JSON.parse(req.body.user);
  const otherUserId = 1;
  const userToCheck = await User.findById(otherUserId);
  const theUser = await User.findById(user._id);
  const check = matchCheck(theUser, userToCheck);
  if (check) {
    const result = await User.updateOne(
      { _id: theUser._id },
      // eslint-disable-next-line
      { $set: { potentialMatches: algorithmResults } }
    );
    const result2 = await User.updateOne(
      { _id: theUser._id },
      // eslint-disable-next-line
      { $set: { potentialMatches: algorithmResults } }
    );
    resp.send(result);
    resp.send(result2);
  } else {
    const result = await User.updateOne(
      { _id: theUser._id },
      { $addToSet: { awaitingApproval: userToCheck._id } }
    );
    resp.send(result);
  }
  // eslint-disable-next-line
  resp.send(result);
});

module.exports = { goodFriends };
