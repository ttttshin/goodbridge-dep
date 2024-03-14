function matchWantedValues(user1WantedValues, user2Values){
  let valuesIntersection = user1WantedValues.filter((x) => user2Values.includes(x));
  if (valuesIntersection.length > 0) {
    let matchingPoints = 6 * valuesIntersection.length;
    return [true, matchingPoints];
  } else {
    return [false, 0];
  }
}

function matchvalues(user1Values, user1WantedValues, user2Values, user2WantedValues) {
  let user1wantsCmp2 = matchWantedValues(user1WantedValues, user2Values);
  let user2wantsCmp1 = matchWantedValues(user2WantedValues, user1Values);
  if (user1wantsCmp2[0] && user2wantsCmp1[0]){
    return [true, user1wantsCmp2[1]+user2wantsCmp1[1]]
  } else {
    return [false, 0]
  }
}

function matchcountry(user1Location, user2Location) {
  if (user1Location[0] === user2Location[0]) {
    return true;
  } else {
    return false;
  }
}

function matchcity(user1Location, user2Location) {
  if (user1Location[1] === user2Location[1]) {
    return true;
  } else {
    return false;
  }
}
// eslint-disable-next-line
function matchworkpreference(firm, freelancer) {
  if (
    firm.workingLocationPreference === "Hybrid" ||
    firm.workingLocationPreference === "In-Person"
  ) {
    return "Location Important";
  } else {
    return "Location Not Important";
  }
}

function goodWorkMatchLocation(firm, freelancer) {
  // eslint-disable-next-line
  if (matchCountry(firm.location, freelancer.location)) {
    // eslint-disable-next-line
    if (matchCity(firm.location, freelancer.location)) {
      return true;
    }
  }
  return false;
}

function matchPayRate(firm, freelancer, payMargin) {
  // eslint-disable-next-line
  payChange = freelancer.pay * payMargin;
  // eslint-disable-next-line
  freelancerRange = [freelancer.pay - payChange, freelancer.pay + payChange];
  // eslint-disable-next-line
  if (firm.pay >= freelancerRange[0] && firm.pay <= freelancerRange[1]) {
    return true;
  }
  return false;
}

// eslint-disable-next-line
function MatchSkills(firm, freelancer, skill_margin) {
  let mustHaveSkills = firm.mustHaveSkills;
  let shouldHaveSkills = firm.shouldHaveSkills;
  let freelancerSkills = freelancer.jobs[firm.jobType];
  //create an intersection of the two arrays
  let mustHaveSkillsIntersection = mustHaveSkills.filter((x) =>
    freelancerSkills.includes(x)
  );
  // eslint-disable-next-line
  let shouldHaveSkillsIntersection = shouldHaveSkills.filter((x) =>
    freelancerSkills.includes(x)
  );
  if (length(mustHaveSkillsIntersection) === length(mustHaveSkills)) {
    // eslint-disable-next-line
    matchingPoints = 10 * length(mustHaveSkillsIntersection);
    // eslint-disable-next-line
    return [true, matchingPoints];
  } else {
    return [false, 0];
  }
}

function matchTimezone(firm, freelancer) {
  if (firm.timezone === freelancer.timezone) {
    return true;
  } else {
    return false;
  }
}

function checkSkillsPayValues(
  firm,
  freelancer,
  skill_margin,
  pay_margin,
  no_values
) {
  let checkCounter = 0;
  let matchingPoints = 0;
  // eslint-disable-next-line
  valueCheck = matchvalues(firm.values, freelancer.values, no_values);
  // eslint-disable-next-line
  payCheck = matchPayRate(firm, freelancer, pay_margin);
  // eslint-disable-next-line
  skillsCheck = MatchSkills(firm, freelancer, skill_margin);
  // eslint-disable-next-line
  if (valueCheck[0] === true) {
    checkCounter += 1;
    // eslint-disable-next-line
    matchingPoints += valueCheck[1];
  }
  // eslint-disable-next-line
  if (payCheck === true) {
    checkCounter += 1;
    matchingPoints += 10;
  }
  // eslint-disable-next-line
  if (skillsCheck[0] === true) {
    checkCounter += 1;
    // eslint-disable-next-line
    matchingPoints += skillsCheck[1];
  }

  return [checkCounter, matchingPoints];
}

//compared to the python implementation, the javascript implementation uses a list of
//potential matches instead of a dictionary of potential matches
//the potential matches has the firm id and the freelancer id
//so they can be added to their respective lists
//more consideration required to implement a different matches list
//for friends and work matching
// eslint-disable-next-line
function GoodWorkMatching(database, payRateMatchMargin, noValues) {
  let firmList = [];
  let freelancerList = [];
  let potentialMatches = [];
  for (let i = 0; i < database.length; i++) {
    if (database[i].hiring === true) {
      firmList.push(database[i]);
    } else if (database[i].freelancer === true) {
      freelancerList.push(database[i]);
    }
  }

  for (let i = 0; i < firmList.length; i++) {
    let firm = firmList[i];
    for (let j = 0; j < freelancerList.length; j++) {
      let freelancer = freelancerList[j];
      let skillMargin = 0.2;
      let payMargin = 0.25;

      if (matchworkpreference(firm, freelancer) === "Location Important") {
        if (goodWorkMatchLocation(firm, freelancer)) {
          let overallCheck = checkSkillsPayValues(
            firm,
            freelancer,
            skillMargin,
            payMargin,
            noValues
          );
          if (overallCheck[0] == 3) {
            potentialMatches.push([firm._id, freelancer._id]);
          }
        }
      } else {
        if (matchTimezone(firm, freelancer)) {
          let overallCheck = checkSkillsPayValues(
            firm,
            freelancer,
            skillMargin,
            payMargin,
            noValues
          );
          if (overallCheck[0] == 3) {
            potentialMatches.push([firm._id, freelancer._id]);
          }
        }
      }
    }
  }

  return potentialMatches;
}

function GoodFriendsMatching(user1, database, no_values) {
  const user1Values = user1.values;
  const user1WantedValues = user1.wantedValues
  const user1Location = user1.location;
  let potentialMatches = [];
  for (let i = 0; i < database.length; i++) {
    let matching_score = 0;
    let user2Values = database[i].values;
    const user2WantedValues = database[i].wantedValues;
    let user2Location = database[i].location;
    if (!user1._id.equals(database[i]._id)) {
      let match_check = matchvalues(user1Values, user1WantedValues,
         user2Values, user2WantedValues, no_values);
      if (match_check[0] === true) {
        // eslint-disable-next-line
        matching_score += match_check[1];
      }
      if (matchcountry(user1Location, user2Location)) {
        matching_score += 10;
      }
      if (matchcity(user1Location, user2Location)) {
        matching_score += 10;
      }
      // eslint-disable-next-line
      if (matching_score >= 30) {
        potentialMatches.push(database[i]._id);
      }
    }
  }
  return potentialMatches;
}

function matchCheck(user1, user2) {
  // Implementation of checking for match
  let result = false;
  for (let i = 0; i < user2.awaitingApproval.length; i++) {
    if (user2.awaitingApproval[i]._id.equals(user1._id)) {
      // eslint-disable-next-line
      result = True;
      break;
    }
  }
  return result;
}

module.exports = {
  GoodFriendsMatching,
  matchCheck,
};
