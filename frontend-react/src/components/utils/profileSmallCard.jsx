import React from "react";

// eslint-disable-next-line
function ProfileSmallCard(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <div className="rounded-lg border w-full hover:bg-black hover:text-white">
        <h3 className="text-lg ml-2 text-gray-900 font-medium leading-8">
          {user.name}
        </h3>
      </div>
    </div>
  );
}

export default ProfileSmallCard;
