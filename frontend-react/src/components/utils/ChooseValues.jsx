import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function ChooseValues(props) {
  const values = [
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
    // eslint-disable-next-line
    if (props.element.length > 0) {
      // eslint-disable-next-line
      setSelected(props.element);
    }
    // eslint-disable-next-line
  }, [props.element]);
  const limit = 5;

  const handleClick = (value) => {
    const selectedValues = [...selected];
    const unSelectedValues = [...unSelected];
    if (selectedValues.includes(value)) {
      const index = selectedValues.indexOf(value);
      selectedValues.splice(index, 1);
      unSelectedValues.push(value);
    } else {
      selectedValues.push(value);
      const index = unSelectedValues.indexOf(value);
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
    const values = [...selected];
    let data = { user, values };
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/setValue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    });
    // eslint-disable-next-line
    result = await result.json();
    alert("Your profile has been updated");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-5">
        {values.map((value) => (
          <button
            key={value}
            onClick={() => handleClick(value)}
            style={{
              backgroundColor: selected.includes(value) ? "green" : "white",
              color: selected.includes(value) ? "white" : "green",
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
            {value}
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

export default ChooseValues;
