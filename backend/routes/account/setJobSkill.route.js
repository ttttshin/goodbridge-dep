const { verifyToken } = require("../../utils/token");
const express = require("express");
const setJobSkill = express();
const User = require("../../db/User");

setJobSkill.post("/setJobSkill", verifyToken, async (req, resp) => {
  const skills = req.body.skills;
  const user = JSON.parse(req.body.user);

  try {
    const jobSkills = skills.reduce((acc, skill) => {
      const { job, values } = skill;
      if (!acc[job]) {
        acc[job] = values;
      } else {
        acc[job] = [...acc[job], ...values];
      }
      return acc;
    }, {});

    const result = await User.updateOne(
      { _id: user._id },
      { $set: { jobs: jobSkills } },
      { new: true }
    );
    resp.send(result);
  } catch (error) {
    console.error(error);
    resp.status(500).send("Internal Server Error");
  }
});

module.exports = { setJobSkill };
