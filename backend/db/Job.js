const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  pay: Number,
  mustHaveSkills: Array,
  shouldHaveSkills: Array,
  jobType: String,
});

module.exports = mongoose.model("Job", jobSchema);
