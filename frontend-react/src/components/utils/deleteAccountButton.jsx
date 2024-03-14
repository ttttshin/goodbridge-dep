import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteAccountButton() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const deleteAccount = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/deleteAccount`,
      {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(user),
      }
    );
    result = await result.json();
    if (result.acknowledged === true) {
      localStorage.clear();
      navigate("/");
      window.location.reload(false);
    }
  };

  return (
    <div className="shadow-xl bg-offwhite2 rounded-lg p-3 top-10 hover:scale-105 text-center my-3">
      <button onClick={() => setIsOpen(true)}>Delete Account</button>

      {isOpen && (
        <div>
          <div className="text-center my-3 space-x-10">
            <h1>Are you sure you want to delete your account?</h1>
          </div>
          <div className="text-center my-3 space-x-10">
            <h1>This action cannot be undone.</h1>
          </div>
          <div className="text-center my-3 space-x-10">
            <button onClick={() => deleteAccount()}>Yes</button>
            <button onClick={() => setIsOpen(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccountButton;
