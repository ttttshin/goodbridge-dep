import React from "react";
import UpdateProfileCard from "./updateProfileCard";
import CompleteProfileCard from "./completeProfileCard";

// eslint-disable-next-line
function profileCard(props) {
  return (
    <div className="p-2">
      <div className="text-center my-3">
        <div className="shadow-xl bg-offwhite2 rounded-lg p-3 top-44">
          <UpdateProfileCard />
          <CompleteProfileCard />
        </div>
      </div>
    </div>
  );
}

export default profileCard;
