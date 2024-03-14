const { verifyToken } = require("../../utils/token");
const express = require("express");
const getJobs = express();
const User = require("../../db/User");

getJobs.get(`/getJobs/:id`, verifyToken, async (req, resp) => {
  const id = req.params.id;
  try {
    const result = await User.findOne({ _id: id });
    const jobs = result.jobs;
    resp.send(jobs);
  } catch (error) {
    console.error(error);
    resp.status(500).send("Internal Server Error");
  }
});

module.exports = { getJobs };
