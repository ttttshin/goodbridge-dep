import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateComponent() {
  let user = localStorage.getItem("user");
  try {
    user = JSON.parse(user);
  } catch (error) {
    user = null;
  }
  return <div>{user ? <Outlet /> : <Navigate to="/" />}</div>;
}

export default PrivateComponent;
