import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

function ChooseWantedValues(props) {
  const wantedValues = [
    "Climate Justice",
    "Feminism",
    "Disability Rights",
    "LGBTQIA+ Rights",
    "Mental Health",
    "COVID19",
    "Food Insecurity",
    "Homelessness",
    "Poverty Eradication",
    "Racial Justice",
    "Refugee Crisis",
    "Reproductive Rights",
    "Sexual Health",
    "Voting Rights",
    "Sustainability",
  ];
  const [selected, setSelected] = useState([]);
  const [unSelected, setUnSelected] = useState([]);
  useEffect(() => {
    if (props.element.length > 0) {
      setSelected(props.element);
    }
  }, [props.element]);

  const limit = 5;

  const handleClick = (wantedValue) => {
    const selectedValues = [...selected];
    const unSelectedValues = [...unSelected];
    if (selectedValues.includes(wantedValue)) {
      const index = selectedValues.indexOf(wantedValue);
      selectedValues.splice(index, 1);
      unSelectedValues.push(wantedValue);
    } else {
      selectedValues.push(wantedValue);
      const index = unSelectedValues.indexOf(wantedValue);
      unSelectedValues.splice(index, 1);
    }
    if (selectedValues.length > limit) {
      const removed = selectedValues.shift();
      unSelectedValues.push(removed);
    }
    setSelected(selectedValues);
    setUnSelected(unSelectedValues);
  };

  const collectData = async () => {
    const user = localStorage.getItem("user");
    const wantedValues = [...selected];
    let data = { user, wantedValues };
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/setWantedValue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    });

    await result.json();
    alert("Your profile has been updated");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-5">
        {wantedValues.map((wantedValue) => (
          <button
            key={wantedValue}
            onClick={() => handleClick(wantedValue)}
            style={{
              backgroundColor: selected.includes(wantedValue) ? "green" : "white",
              color: selected.includes(wantedValue) ? "white" : "green",
              border: "1px solid green",
              rounded: "100%",
              width: "150px",
              height: "60px",
              margin: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {wantedValue}
          </button>
        ))}
      </div>
      <div className="flex justify-center">
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
    </div>
  );
}

ChooseWantedValues.propTypes = {
  element: PropTypes.array.isRequired,
};

export default ChooseWantedValues;
