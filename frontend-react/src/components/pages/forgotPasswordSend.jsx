import React from "react";
import { useState } from "react";

function ForgotPasswordChange() {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/sendPasswordEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
            email: email,
          },
        }
      );
      if (!response.ok) {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-20">
      <form className="flex flex-col box-content mt-20 h-50 w-3/6 p-5 rounded-3xl drop-shadow-2xl bg-offwhite">
        <h1 className="text-3xl font-bold">Forgot Password</h1>

        <label className="text-xl p-2 text-Black">
          <p>Enter your email to reset your password:</p>
        </label>
        <input
          type="email"
          id="email"
          className="border-2 drop-shadow-md border-offwhite2 bg-nearlywhite rounded-lg p-2 m-2 hover:bg-GoodBridge_Cream ease-in transition-all duration-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded animate-pulse"
          onClick={sendEmail}
        >
          Send Email
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordChange;
