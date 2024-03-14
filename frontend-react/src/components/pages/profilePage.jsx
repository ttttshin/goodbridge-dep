import React from "react";
import ProfileCard from "../utils/profileCard";
import DeleteAccountButton from "../utils/deleteAccountButton";

function profilePage() {
  return (
    <>
      <div className="flex flex-col items-center p-32 ">
        <ProfileCard />
        <DeleteAccountButton />
      </div>
    </>
  );
}

export default profilePage;
