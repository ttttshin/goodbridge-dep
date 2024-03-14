import React, { useState, useEffect } from "react";
import ModalButton from "./modalButton";
import ChooseValues from "./ChooseValues";
import ChooseWantedValues from "./ChooseWantedValues";
import ChooseJob from "./ChooseJob";
import PersonalDetails from "./PersonalDetails";

// eslint-disable-next-line
export default function CompleteProfileCard(props) {
  const [values, setValues] = useState([]);
  const [wantedValues, setWantedValues] = useState([]);
  const [jobs, setJobs] = useState([]);

  const getValues = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getValues/${user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    // eslint-disable-next-line
    result = await result.json();
    setValues(result);
    return result;
  };

  const getWantedValues = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getWantedValues/${user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    // eslint-disable-next-line
    result = await result.json();
    setWantedValues(result);
    return result;
  };

  const getJobs = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getJobs/${user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    // eslint-disable-next-line
    result = await result.json();
    setJobs(result);
    return result;
  };

  useEffect(() => {
    getValues();
    getWantedValues();
    getJobs();
  }, []);

  return (
    <div className="p-2">
      <h3 className="text-center text-xl  font-medium leading-8">
        Click to complete user registration to get more Matches!
      </h3>
      <ModalButton title="I am interested in" bg="bg-GoodBridge_LightBlue">
        <ChooseValues element={values} />
      </ModalButton>

      <ModalButton title="I want to match with someone interested in" bg="bg-GoodBridge_LightBlue">
        <ChooseWantedValues element={wantedValues} />
      </ModalButton>

      <ModalButton title="My jobs of interest are" bg="bg-GoodBridge_LightBlue">
        <ChooseJob element={jobs} />
      </ModalButton>

      <ModalButton title="Update Personal Details" bg="bg-GoodBridge_Cream">
        <PersonalDetails />
      </ModalButton>
    </div>
  );
}
