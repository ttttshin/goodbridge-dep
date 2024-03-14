const { verifyToken } = require("../../utils/token");
const express = require("express");
const goodFriendsYes = express();
const User = require("../../db/User");

goodFriendsYes.post(`/makeChoiceYes/:id`, verifyToken, async (req, resp) => {
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
  //If you are in their approval list, then it is a match! Pop from their awaiting and our potential matches array, move both to matches
  if (canMatch) {
    //if we are in their awaiting approval list, then we remove us from their awaiting approval list
    // eslint-disable-next-line
    let removeFromOtherUser = await User.updateOne(
      { _id: otherUser._id },
      { $pull: { awaitingApproval: user._id } }
    );
    
    // eslint-disable-next-line
    let removePotentialResult = await User.updateOne(
      { _id: user._id },
      { $pull: { potentialMatches: otherUser._id } }
    );

    //add us to their matches list
    // eslint-disable-next-line
    let addToOtherUser = await User.updateOne(
      { _id: otherUser._id },
      { $addToSet: { matches: user._id } }
    );

    // eslint-disable-next-line
    let addOtherUser = await User.updateOne(
      { _id: user._id },
      { $addToSet: { matches: otherUser._id } }
    );

    // eslint-disable-next-line
    let removeOtherUser = await User.updateOne(
      { _id: user._id },
      { $pull: { awaitingApproval: otherUser._id } }
    );
  }
  //We are not in their waitingApproval list, hence they get moved into our awaiting
  else {
    // eslint-disable-next-line
    let addOtherUser = await User.updateOne(
      { _id: user._id },
      { $addToSet: { awaitingApproval: otherUser._id } }
    );
    // we remove them from our potential matches
    // eslint-disable-next-line
    let removePotentialResult = await User.updateOne(
      { _id: user._id },
      { $pull: { potentialMatches: otherUser._id } }
    );
  }

  return resp.send(otherUser);
});

module.exports = { goodFriendsYes };
