import React from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <button
      className="border-solid border rounded-lg w-full justify-start border-red text-red hover:bg-red hover:text-GoodBridge_Cream"
      onClick={logout}
    >
      <CiLogout className="inline-block ml-2" />
      Logout
    </button>
  );
}

export default LogoutButton;
