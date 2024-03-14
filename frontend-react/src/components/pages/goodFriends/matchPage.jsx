import React from "react";
import { useState, useEffect } from "react";
import MatchCards from "../../utils/matchCards";

function MatchPage() {
  const [matches, setMatches] = useState([]);

  const getMatch = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getPotentialMatches/${user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setMatches(result);
  };

  useEffect(() => {
    getMatch();
  }, []);

  return (
    <div className="flex flex-col items-center p-32">
      <div className="flex flex-col items-center">
        <div className="flex flex-row flex-wrap justify-center">
          <MatchCards element={matches} />
        </div>
      </div>
    </div>
  );
}

export default MatchPage;
