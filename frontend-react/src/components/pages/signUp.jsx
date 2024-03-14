import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/goodWork/landingPage");
    }
    // eslint-disable-next-line
  }, []);

  const collectData = async () => {
    let item = { name, email, password };
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/resendemail");
    } else {
      if (result.message) {
        alert(result.message);
        setPassword("");
        return;
      }
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/goodFriends/landingPage");
    }
  };

  return (
    <div className="flex flex-col m-10 items-center font-style: italic p-20">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <form className="flex flex-col box-content mt-20 h-96 w-3/6 p-5 rounded-3xl drop-shadow-2xl bg-offwhite">
        <label className="flex-row text-xl p-2 text-black ">
          <p>Username</p>
        </label>
        <input
          type="text"
          id="name"
          data-testid="name"
          className=" border-2 drop-shadow-md border-offwhite2 bg-nearlywhite rounded-lg p-2 m-2 hover:bg-GoodBridge_Cream ease-in transition-all duration-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="text-xl p-2 text-black">
          <p>Email</p>
        </label>
        <input
          type="email"
          id="email"
          data-testid= "email"
          className="border-2 drop-shadow-md border-offwhite2 bg-nearlywhite rounded-lg p-2 m-2 hover:bg-GoodBridge_Cream ease-in transition-all duration-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-xl p-2 text-black">
          <p>Password</p>
        </label>
        <input
          type="password"
          id="password"
          data-testid="password"
          className="border-2 drop-shadow-md border-offwhite2 bg-nearlywhite rounded-lg p-2 m-2 hover:bg-GoodBridge_Cream ease-in transition-all duration-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          data-testid = "button"
          className="m-auto w-48 bg-lightgray hover:bg-GoodBridge_Orange text-black rounded-md p-2 cursor-pointer focus:outline-none
          ease-linear transition-all duration-150"
          onClick={collectData}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
