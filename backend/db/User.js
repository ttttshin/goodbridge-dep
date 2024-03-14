const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isAdmin:{type: Boolean, default: false},
  name: String,
  email: String,
  bio: String,
  password: Object,
  verifiedAccount: { type: Boolean, default: false },
  age: Number,
  values: Array,
  wantedValues: Array,
  location: Array,
  locationPreference: String,
  pay: Number,
  timezone: String,
  timezoneDifference: Number,
  potentialMatches: Array,
  awaitingApproval: Array,
  matches: Array,
  visited: Array,
  hiring: Boolean,
  freelancer: Boolean,
  jobOffer: Array,
  // eslint-disable-next-line
  visited: Array,
  jobs: { type: Map, of: Array, default: {} },
});

module.exports = mongoose.model("User", userSchema);
