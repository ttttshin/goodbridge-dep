import React from "react";

function about() {
  return (
    <div>
      <div className="flex flex-col items-center p-32 font-style: italic">
        <h1 className="text-black font-bold text-4xl">About</h1>
      </div>

      <div className="flex flex-col justify-left items-left h-[65vh] ml-20 mr-20 space-y-5 p-10 bg-offwhite rounded-lg drop-shadow-lg">
        <h1 className="text-2xl font-bold  text-black">What?</h1>
        <br></br>
        <p className="text-xl  text-black">
          We use an innovative, values-based matching algorithm to connect
          like-minded professionals based on shared values, preferred time
          zones, freelance type and relevant skill set.{" "}
        </p>
        <br></br>
        <h1 className="text-2xl font-bold  text-black">Why?</h1>
        <br></br>
        <p className="text-xl  text-black">
          {" "}
          To connect professionals based on shared values so that people feel
          less isolated and more valued in the modern, post-pandemic world of
          work. This, in turn, allows people to create more valuable work.
          GoodBridge is the ideal place for countless workers who are leaving
          the mainstream job market in record numbers in search of meaningful
        </p>
        <br></br>
        <h1 className="text-2xl font-bold  text-black">How?</h1>
        <br></br>
        <p className="text-xl  text-black">
          GoodBridge offers two modes of matching:{" "}
        </p>
        <br></br>
        <p className="text-xl  text-black">
          1. GoodWorks - Matching socially-conscious brands with like-minded
          freelancers through an ethical platform that disrupts exploitation
          within the gig economy.{" "}
        </p>
        <br></br>
        <p className="text-xl  text-black">
          2. GoodFriends - Connecting purpose-driven people who are seeking
          companionship with like-minded people, mentors and collaboration
          partners.
        </p>
      </div>
    </div>
  );
}

export default about;
