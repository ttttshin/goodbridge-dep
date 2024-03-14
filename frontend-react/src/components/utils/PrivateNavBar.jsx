import React from "react";
import NavBar from "./NavBar";
import HiddenNavBar from "./hiddenNavBar";

function PrivateComponent() {
  let user = localStorage.getItem("user");
  try {
    user = JSON.parse(user);
  } catch (error) {
    user = null;
  }
  return <div>{user ? <HiddenNavBar /> : <NavBar />}</div>;
}

export default PrivateComponent;
