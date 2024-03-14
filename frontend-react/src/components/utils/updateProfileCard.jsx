import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const validator = require("validator");

// eslint-disable-next-line
export default function UpdateProfileCard(props) {
  const [isEmailUpdateVisible, setisEmailUpdateVisible] = useState(false);
  const [isPasswordUpdateVisible, setisPasswordUpdateVisible] = useState(false);
  const [isBioUpdateVisible, setisBioUpdateVisible] = useState(false);
  const [displayEmailError, setdisplayEmailError] = useState(false);
  const [displayPasswordError, setdisplayPasswordError] = useState("");
  const [newemail, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const asyncinsideuseffect = async () => {
      getBio();
      setBio(bio);
    };
    asyncinsideuseffect();
    // eslint-disable-next-line
  }, []);

  const updateEmail = async () => {
    const oldemail = user.email;
    let emailExists = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/email/${newemail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    emailExists = await emailExists.json();
    if (emailExists.message === "exists") {
      setdisplayEmailError(true);
      return;
    }

    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/updateEmail`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ oldemail, newemail }),
      }
    );
    result = await result.json();
    user.email = result.email;
    if (result.email) {
      localStorage.setItem("user", JSON.stringify(user));
      alert("email updated");
      navigate("/goodFriends/profilePage");
    } else {
      setdisplayEmailError(true);
    }
  };

  const checkPasswords = async () => {
    if (oldPassword === newPassword) {
      setdisplayPasswordError(
        "new password cannot be the same as old password"
      );
      return;
    }
    if (validator.isStrongPassword(newPassword) === false) {
      setdisplayPasswordError(
        "password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      );
      return;
    } else {
      setdisplayPasswordError("");
    }
    const email = user.email;
    const password = oldPassword;
    const data = {
      email,
      password,
    };
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.auth) {
      setdisplayPasswordError("");
      updatePassword();
    } else {
      setdisplayPasswordError("incorrect password");
    }
  };

  const updatePassword = async () => {
    const id = user._id;
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/updatepassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ id, newPassword }),
      }
    );
    result = await result.json();
    if (!result.message && result.acknowledged) {
      alert("password updated");
      navigate("/goodFriends/profilePage");
    }
  };

  const getBio = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getBio/${user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    //eslint-disable-next-line
    result = await result.json();
    setBio(result.bio);
  };

  const addBio = async () => {
    const user = localStorage.getItem("user");
    const item = { user, bio };
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/setBio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(item),
    });
    //eslint-disable-next-line
    result = await result.json();
    alert("bio updated");
    navigate("/goodFriends/profilePage");
  };

  return (
    <div className="p-2">
      <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
        {user.name}
      </h3>
      <div className="grid grid-cols-3 content-center">
        <div className="px-2 py-2 text-gray-500 font-semibold">Email </div>
        <div className="px-2 py-2 ">{user.email}</div>
        <button
          className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
          onClick={() => {
            setisEmailUpdateVisible(!isEmailUpdateVisible);
            setisPasswordUpdateVisible(false);
            setisBioUpdateVisible(false);
            setdisplayEmailError(false);
            setdisplayPasswordError("");
            if (!isEmailUpdateVisible) {
              setEmail("");
            }
          }}
        >
          Update Email
        </button>
      </div>
      {isEmailUpdateVisible && (
        <div className="flex flex-col items-center">
          <input
            type="email"
            className="border bg-GoodBridge_Cream rounded-md p-2 m-2"
            value={newemail}
            placeholder="new email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="mx-auto mt-4 w-36 bg-DarkGreen hover:bg-GoodBridge_Orange text-black font-bold  py-2 px-2 rounded"
            onClick={updateEmail}
          >
            Update Email
          </button>
        </div>
      )}
      {displayEmailError && (
        <div className="flex flex-col items-center">
          <p className="text-red-500">invalid email</p>
        </div>
      )}
      <div className="grid grid-cols-3 content-center">
        <div className="px-2 py-2 font-semibold">Password</div>
        <div className="px-2 py-2">*****</div>
        <button
          className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
          onClick={() => {
            setdisplayPasswordError("");
            setdisplayEmailError(false);
            setisEmailUpdateVisible(false);
            setisBioUpdateVisible(false);
            setisPasswordUpdateVisible(!isPasswordUpdateVisible);
            if (!isPasswordUpdateVisible) {
              setOldPassword("");
              setNewPassword("");
            }
          }}
        >
          Update Password
        </button>
      </div>
      {isPasswordUpdateVisible && (
        <div className="flex flex-col items-center">
          <input
            type="password"
            placeholder="old password"
            className="border bg-GoodBridge_Cream rounded-md p-2 m-2"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="new password"
            className="border bg-GoodBridge_Cream rounded-md p-2 m-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="mx-auto mt-4 w-36 bg-DarkGreen hover:bg-GoodBridge_Orange text-black font-bold  py-2 px-2 rounded"
            onClick={checkPasswords}
          >
            Update Password
          </button>
        </div>
      )}
      {displayPasswordError !== "" && (
        <div className="flex flex-col items-center">
          <p className="text-red-500">{displayPasswordError}</p>
        </div>
      )}
      <div className="grid grid-cols-3 content-center">
        <div className="px-2 py-2 text-black font-semibold">Bio</div>
        <div className="px-2 py-2">{bio}</div>
        <button
          className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
          onClick={() => {
            setdisplayPasswordError("");
            setdisplayEmailError(false);
            setisEmailUpdateVisible(false);
            setisPasswordUpdateVisible(false);
            setisBioUpdateVisible(!isBioUpdateVisible);
            if (!isBioUpdateVisible) {
              setBio("");
            }
          }}
        >
          Update Bio
        </button>
      </div>
      {isBioUpdateVisible && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="new bio"
            className="border bg-GoodBridge_Cream rounded-md p-2 m-2"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button
            className="mx-auto mt-4 w-36 bg-DarkGreen hover:bg-GoodBridge_Orange text-black font-bold  py-2 px-2 rounded"
            onClick={addBio}
          >
            Update Bio
          </button>
        </div>
      )}
    </div>
  );
}
