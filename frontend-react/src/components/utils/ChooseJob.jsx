import React, { useState, useEffect } from "react";
import { jobs } from "./jobs";

function ChooseJob(props) {
  const [selectedButton, setSelectedButton] = useState([]);
  // eslint-disable-next-line
  const [unSelectedButton, setUnSelectedButton] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  // eslint-disable-next-line
  const [selectedValuesWithJobs, setSelectedValuesWithJobs] = useState([]);

  const jobsLimit = 4;

  useEffect(() => {
    // eslint-disable-next-line
    if (props.element) {
      const selectedJobs = [];
      const unSelectedJobs = [];
      const selectedButtons = [];
      const unSelectedButtons = [];
      const selectedValues = [];
      // eslint-disable-next-line
      Object.keys(props.element).forEach((key) => {
      // eslint-disable-next-line
        if (props.element[key].length > 0) {
          selectedJobs.push(key);
          // eslint-disable-next-line
          selectedValues.push(...props.element[key]);
        } else {
          unSelectedJobs.push(key);
        }
      });
      selectedJobs.forEach((job) => {
        jobs.forEach((item) => {
          if (item.name === job) {
            selectedButtons.push(...item.values);
          }
        });
      });
      unSelectedJobs.forEach((job) => {
        jobs.forEach((item) => {
          if (item.name === job) {
            unSelectedButtons.push(...item.values);
          }
        });
      });
      setSelectedButton(selectedButtons);
      setUnSelectedButton(unSelectedJobs);
      setSelectedJob(selectedJobs);
      setSelectValue(selectedValues);
      // eslint-disable-next-line
      setSelectedValuesWithJobs(props.element);
    }
    // eslint-disable-next-line
  }, [props.element]);

  const handleJobClick = (job) => {
    const selectedJobs = [...selectedJob];
    const unSelectedJobs = [...selectedButton];
    if (selectedJobs.includes(job)) {
      const index = selectedJobs.indexOf(job);
      selectedJobs.splice(index, 1);
      unSelectedJobs.push(job);
    } else {
      selectedJobs.push(job);
      const index = unSelectedJobs.indexOf(job);
      unSelectedJobs.splice(index, 1);
    }
    if (selectedJobs.length > jobsLimit) {
      selectedJobs.push(job);
      const index = unSelectedJobs.indexOf(job);
      unSelectedJobs.splice(index, 1);
    }
    const selectedButtons = [];
    selectedJobs.forEach((job) => {
      jobs.forEach((item) => {
        if (item.name === job) {
          selectedButtons.push(...item.values);
        }
      });
    });
    const unSelectedButtons = [];
    unSelectedJobs.forEach((job) => {
      jobs.forEach((item) => {
        if (item.name === job) {
          unSelectedButtons.push(...item.values);
        }
      });
    });
    const selectedValues = [...selectValue];
    unSelectedButtons.forEach((value) => {
      const index = selectedValues.indexOf(value);
      if (index !== -1) {
        selectedValues.splice(index, 1);
      }
    });
    setSelectValue(selectedValues);
    setUnSelectedButton(unSelectedJobs);
    setSelectedJob(selectedJobs);
    setSelectedButton(unSelectedJobs);
    setSelectedButton(selectedButtons);
  };

  const handleValueClick = (value) => {
    const selectedValues = [...selectValue];
    if (selectedValues.includes(value)) {
      const index = selectedValues.indexOf(value);
      selectedValues.splice(index, 1);
    } else {
      selectedValues.push(value);
    }
    setSelectValue(selectedValues);
  };

  const saveValues = () => {
    const selectedValues = [...selectValue];
    const selectedJobs = [...selectedJob];
    const selectedValuesWithJobs = [];
    selectedJobs.forEach((job) => {
      const values = [];
      selectedValues.forEach((value) => {
        jobs.forEach((item) => {
          if (item.name === job) {
            if (item.values.includes(value)) {
              values.push(value);
            }
          }
        });
      });
      selectedValuesWithJobs.push({ job, values });
    });
    return selectedValuesWithJobs;
  };

  const collectData = async () => {
    const user = localStorage.getItem("user");
    const skills = saveValues();
    let data = { user, skills };
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/setJobSkill`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(data),
      }
    ); // eslint-disable-next-line
    result = await result.json();
    alert("Your profile has been updated");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4">
        {jobs.map((job) => (
          <button
            className="bg-green-500 text-white font-bold rounded-md"
            style={{
              backgroundColor:
                selectedJob && selectedJob.indexOf(job.name) !== -1
                  ? "green"
                  : "white",
              color:
                selectedJob && selectedJob.indexOf(job.name) !== -1
                  ? "white"
                  : "green",
              border: "1px solid green",
              rounded: "100%",
              width: "150px",
              height: "50px",
              margin: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              outline: "none",
            }}
            key={job.id}
            onClick={() => {
              handleJobClick(job.name);
            }}
          >
            {job.name}
          </button>
        ))}
        {selectedJob &&
          selectedJob.length > 0 &&
          selectedButton.map((value) => (
            <button
              className="bg-orange-500 text-black font-bold rounded-md"
              style={{
                backgroundColor: selectValue.includes(value)
                  ? "orange"
                  : "white",
                color: selectValue.includes(value) ? "white" : "orange",
                border: "1px solid orange",
                rounded: "100%",
                width: "auto",
                height: "auto",
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                outline: "none",
              }}
              onClick={() => handleValueClick(value)}
              key={value}
            >
              {value}
            </button>
          ))}
      </div>
      <button
        className="text-black font-bold uppercase text-sm px-6 py-3
          rounded shadow hover:shadow-lg outline-none focus:outline-none
          mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={collectData}
      >
        Submit
      </button>
    </div>
  );
}

export default ChooseJob;
