import React from "react";
import CustomButton from "../utils/CustomButton";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate("/login");
  };

  const moveToSignUp = () => {
    navigate("/signUp");
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen ">

        <div className="text-6xl font-bold mb-4">Welcome To GoodBridge</div>

        <div className="box-content flex flex-col mt-5 mb-0.5 items-center rounded-lg ">
          <div className="flex flex-col justify-center items-center space-y-5 p-10 bg-offwhite rounded-2xl drop-shadow-lg ">
            <div className="flex flex-row items-center space-x-5">
              <h1 className="text-4xl text-black">Connecting</h1>
              <h1 className="text-4xl text-black font-bold">mission-driven</h1>
            </div>
            <div className="flex flex-row items-center space-x-5">
              <h1 className="text-4xl text-black whitespace-pre font-bold">
                professionals
              </h1>
              <h1 className="text-4xl text-black whitespace-pre">for the modern</h1>
            </div>
            <div className="flex flex-row items-center space-x-5">
              <h1 className="text-4xl text-black"> world of work.</h1>
            </div>
            <div className="flex flex-row space-x-5 ">
              <CustomButton text="Login" action={moveToLogin} />
              <CustomButton text="Sign Up" action={moveToSignUp} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="box-content flex flex-col mb-1 items-center rounded-lg drop-shadow-lg">
        <div className="flex flex-col justify-left items-left h-[55vh] ml-10 mr-10 space-y-3 p-10 bg-white rounded-lg ">
          <h1 className="text-2xl font-bold  text-black">What We Do</h1>
          <br></br>
          <p className="text-xl  text-black">
            We use an innovative, values-based matching algorithm to connect
            like-minded professionals based on shared values, preferred time
            zones, freelance type and relevant skill set.{" "}
          </p>
          <br></br>
          <h1 className="text-2xl font-bold  text-black">Why We Do It</h1>
          <br></br>
          <p className="text-xl  text-black">
            {" "}
            To connect professionals based on shared values so that people feel
            less isolated and more valued in the modern, post-pandemic world of
            work. This, in turn, allows people to create more valuable work.
            GoodBridge is the ideal place for countless workers who are leaving
            the mainstream job market in record numbers in search of meaningful
          </p>
        </div>
      </div>

    </div>
  
  

  
  
  );
}

export default Homepage;
