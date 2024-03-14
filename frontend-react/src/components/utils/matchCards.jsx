import React from "react";
import { useEffect, useState } from "react";

function MatchCards(props) {
  const [matches, setMatches] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [otherUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [values, setValues] = useState([]);
  const [choice, setChoice] = useState(null);

  const makeChoiceYes = async (matchUser) => {
    const user = JSON.parse(localStorage.getItem("user"));

    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setChoice(null);
    }, 500);
    const otherUser = matches.find((match) => match === matchUser);
    let data = { user, otherUser, choice: "yes" };
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/makeChoiceYes/${user._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(data),
      }
    );
    // eslint-disable-next-line
    result = await result.json();
  };

  const makeChoiceNo = async (matchUser) => {
    const user = JSON.parse(localStorage.getItem("user"));
    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setChoice(null);
    }, 500);
    const otherUser = matches.find((match) => match === matchUser);
    let data = { user, otherUser, choice: "no" };
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/makeChoiceNO/${user._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(data),
      }
    );
    // eslint-disable-next-line
    result = await result.json();
  };

  useEffect(() => {
    // eslint-disable-next-line
    setMatches(props.element);
    // eslint-disable-next-line
    setValues(props.element);
    // eslint-disable-next-line
  }, [props.element]);

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {matches[currentIndex] && (
        <div
          className={`rounded-lg items-center shadow-xl m-4 p-4 w-[750px] h-[700px] ${
            choice === "yes"
              ? "translate-x-full opacity-0 ease-out transform duration-700"
              : choice === "no"
              ? "-translate-x-full opacity-0 ease-out transform duration-700"
              : ""
          }${
            choice
              ? "translate-y-full opacity-0 ease-in transform duration-500"
              : ""
          }`}
        >
          <div className="flex flex-col items-center mt-10">
            <h1 key={matches[currentIndex].name} className="text-2xl font-bold">
              {matches[currentIndex].name}
            </h1>
          </div>
          <div className="flex flex-col items-center mt-8">
            <h1 className="text-xl font-bold">About Me:</h1>
            <p key={matches[currentIndex].bio} className="text-xl ">
              {matches[currentIndex].bio}
            </p>
          </div>
          <div className="flex items-center mt-8 gap-2 row-span-2">
            {values[currentIndex].values.map((value) => (
              <div key={value} className="items-center  ">
                <button
                  className="text-1xl font-bold border-2 border-black rounded-md h-max w-max p-2 shadow-xl
                  hover:scale-105"
                >
                  {value}
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center mt-8">
            <h1 className="text-xl font-bold">Location:</h1>
            <p key={matches[currentIndex].location[0]} className="text-xl ">
              Country: {matches[currentIndex].location[0]}
            </p>
            <p key={matches[currentIndex].location[1]} className="text-xl ">
              City: {matches[currentIndex].location[1]}
            </p>
          </div>

          <div className="flex flex-row gap-10 mt-[400px] justify-center">
            <button
              className="text-black font-bold border-2  rounded w-[50px] hover:bg-red"
              onClick={() => {
                setChoice("no");
                makeChoiceNo(matches[currentIndex]);
              }}
            >
              No
            </button>
            <button
              className="text-black font-bold border-2  rounded w-[50px] hover:bg-GoodBridge_Green"
              onClick={() => {
                setChoice("yes");
                makeChoiceYes(matches[currentIndex]);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchCards;
