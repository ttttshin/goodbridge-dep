import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPasswordChange() {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = async () => {
    
    if (newPassword !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/changePassword/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      }
    );
    result = await result.json();
    if (!result.message && result.acknowledged) {
      alert("password updated");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Forgot Password</h1>

      <div className="flex flex-col box-content mt-60 h-90 w-3/6 p-5 rounded  bg-GoodBridge_Green">
      <label className="text-xl p-2 text-Black">
        <p>Enter your new password:</p>
      </label>
      <input
        type="Password"
        id="newPassword"
        className="border bg-GoodBridge_Green rounded-md p-2 m-2 hover:bg-GoodBridge_Cream ease-in transition-all duration-400"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <label className="text-xl p-2 text-Black">
        <p>Confirm your new password:</p>
      </label>
      <input
        type="Password"
        id="confirmPassword"
        className="border bg-GoodBridge_Green rounded-md p-2 m-2 hover:bg-GoodBridge_Cream ease-in transition-all duration-400"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded animate-pulse"
        onClick={changePassword}
      >
        Change Password
      </button>
      </div >
    </div>
  );
}

export default ForgotPasswordChange;
