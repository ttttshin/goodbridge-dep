const { verifyToken } = require("../../utils/token");
const express = require("express");
const goodFriendsNo = express();
const User = require("../../db/User");

goodFriendsNo.post(`/makeChoiceNo/:id`, verifyToken, async (req, resp) => {
  const user = req.body.user;
  const otherUser = await User.findById(req.body.otherUser.id);

  // eslint-disable-next-line
  let addVisited = await User.updateOne(
    { _id: user._id },
    { $addToSet: { visited: otherUser._id } }
  );

  let canMatch = false;

  //Check to see if other user has us in their awaiting approval list
  for (let i = 0; i < otherUser.awaitingApproval.length; i++) {
    if (otherUser.awaitingApproval[i]._id.equals(user._id)) {
      canMatch = true;
      break;
    }
  }

  if (canMatch) {
    //remove you from their awaiting list
    // eslint-disable-next-line
    let removeFromOtherUser = await User.updateOne(
      { _id: otherUser._id },
      { $pull: { awaitingApproval: user._id } }
    );
    // eslint-disable-next-line
    let removeFromUserPotential = await User.updateOne(
      { _id: user._id },
      { $pull: { potentialMatches: otherUser._id } }
    );
    // eslint-disable-next-line
    let removeFromUserAwaiting = await User.updateOne(
      { _id: user._id },
      { $pull: { awaitingApproval: otherUser._id } }
    );
  } else {
    // eslint-disable-next-line
    let removeFromUserPotential = await User.updateOne(
      { _id: user._id },
      { $pull: { potentialMatches: otherUser._id } }
    );
  }

  return resp.send(otherUser);
});

module.exports = { goodFriendsNo };
