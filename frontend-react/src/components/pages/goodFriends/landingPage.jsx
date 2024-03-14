import React from "react";
import { useEffect } from "react";

function LandingPage() {
  const startMatching = async () => {
    const user = localStorage.getItem("user");
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/GoodFriends`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ user }),
      }
    );
    // eslint-disable-next-line
    result = await result.json();
  };

  useEffect(() => {
    startMatching();
  }, []);

  return (
    <div className="flex flex-col items-center p-40">
      <div className="flex flex-col mt-40">
        <div className="flex flex-row items-center space-x-2">
          <h1 className="text-4xl text-black font-bold">Welcome to</h1>
          <h1 className="text-4xl text-black  whitespace-pre hover:text-GoodBridge_Orange">
            Good Friends
          </h1>
        </div>
        <div className="flex flex-row items-center  mt-10 justify-center">
          <a href="/goodFriends/matchPage">
            <button
              className="bg-GoodBridge_Green text-white py-2 px-4 rounded hover:bg-GoodBridge_Orange shadow-2xl animate-bounce "
              onMouseEnter={(e) => e.target.classList.remove("animate-bounce")}
              onMouseLeave={(e) => e.target.classList.add("animate-bounce")}
            >
              Start Matching
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
