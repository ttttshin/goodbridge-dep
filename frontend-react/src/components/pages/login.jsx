import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const moveToSignUp = () => {
    navigate("/signUp");
  };

  const moveToForgotPassword = () => {
    navigate("/forgotPasswordSend");
  };

  useEffect(() => {

  // we shouldn't directly move the admin to the user page, she needs to go to adin page 
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role"); // Retrieve the role from localStorage

  if (user) {
    if (role === 'admin') {
      navigate("/admin"); // Redirect to admin page if the user is an admin
    } else {
      navigate("/goodFriends/landingPage"); // Redirect to user page otherwise
    }
  }
  
  }, [navigate]);

  const handleLogin = async () => {
    let item = { email, password };
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log(result);
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      //new added funciton to handle role information 
      localStorage.setItem("role", result.role);

      // now I add new logic of checking if it is user or admin 


      if (result.role === 'admin') {
      navigate("/admin"); // Replace with your admin route
    } else {
      navigate("/goodFriends/landingPage");
    }

      window.location.reload(false);

    } else {
      alert(result.message);
      setEmail("");
      setPassword("");
      return;
    }
  };

  return (
    <div className="box-content flex flex-col  font-style: italic m-10 p-20 items-center">
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="flex flex-col box-content mt-20 h-96 w-3/6 p-5 rounded-3xl drop-shadow-2xl bg-offwhite">
        <label className="text-xl">
          <p className="text-black p-2">Email</p>
        </label>
        <input
          type="email"
          className="border-2 drop-shadow-md border-offwhite2 bg-nearlywhite rounded-lg p-2 m-2 hover:bg-GoodBridge_Cream ease-in transition-all duration-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-xl ">
          <p className="mt-4 text-black p-2"> Password</p>
        </label>
        <input
          type="password"
          className="border-2 drop-shadow-md border-offwhite2 rounded-lg p-2 m-2 hover:bg-GoodBridge_Cream ease-in transition-all duration-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="mx-auto mt-8 w-36 bg-lightgray hover:bg-GoodBridge_Orange 
          text-black font-bold  py-2 px-4 rounded cursor-pointer focus:outline-none
         ease-linear transition-all duration-150"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="flex flex-row box-content h-32  w-full rounded space-x-90  bg-green">
          <label
            className="text-xl text-black p-4 m-auto hover:text-GoodBridge_Orange cursor-pointer focus:outline-none
         ease-linear transition-all duration-150"
         onClick={moveToForgotPassword}
          >
            Forgot Password
          </label>
          <label
            className="text-xl text-black p-4 m-auto hover:text-GoodBridge_Orange cursor-pointer focus:outline-none
            ease-linear transition-all duration-150 font"
            onClick={moveToSignUp}
          >
            Create Account
          </label>
        </div>
      </form>
    </div>
  );
}

export default Login;
