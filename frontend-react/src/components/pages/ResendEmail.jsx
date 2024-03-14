
import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Resendemail() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // eslint-disable-next-line
    const value = fetch(`${process.env.REACT_APP_BACKEND_URL}/ResendEmail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        email: user.email,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON === true) {
          navigate("/goodFriends/landingPage");
        }
      });
  });

  const sendEmail = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/ResendEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
            email: user.email,
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
    <div className="flex flex-col box-content m-60 p-10 w-auto h-auto bg-GoodBridge_Green rounded">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">
          Please verify your email address
        </h1>
        <p className="text-center">
          We have sent you an email with a link to verify your email address.
          Please click on the link to verify your email address.
        </p>
        <p className="text-center">
          If you did not receive an email, please click the button below to
          resend the email.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded animate-pulse"
          onClick={sendEmail}
        >
          Resend Email
        </button>
      </div>
    </div>
  );
}

export default Resendemail;
