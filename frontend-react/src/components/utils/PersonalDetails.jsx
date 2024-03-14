import React from "react";
import { useState, useEffect } from "react";
import csc from "country-state-city";
import { useFormik } from "formik";
import Select from "react-select";

function PersonalDetails() {
  const [workType, setworkType] = useState("");
  const [payRate, setpayRate] = useState("");
  const addressFromik = useFormik({
    initialValues: {
      country: null,
      state: null,
      city: null,
    },
    onSubmit: (values) => console.log(JSON.stringify(values)),
  });

  const countries = csc.getAllCountries();

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }));
  const updatedStates = (countryId) =>
    csc.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: state.id,
      ...state,
    }));
  const updatedCities = (stateId) =>
    csc.getCitiesOfState(stateId).map((city) => ({
      label: city.name,
      value: city.id,
      ...city,
    }));

  const { values, setFieldValue } = addressFromik;

  useEffect(() => {}, [values]);

  const collectData = async () => {
    const user = localStorage.getItem("user");
    const work = workType;
    const pay = payRate;
    const countrySelected = values.country;
    const citySelected = values.city;
    const location = [countrySelected.label, citySelected.label];
    const item = { user, work, pay, location };
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/setPersonalDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(item),
      }
    );
    // eslint-disable-next-line
    result = await result.json();
    alert("Your profile has been updated");
  };

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col  w-3/6 rounded">
        <div className="flex flex-col justify-start items-start">
          <label
            htmlFor="countries_multiple"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            What type of work do you do?
          </label>
        </div>
        <select
          id="value 1"
          value={workType}
          onChange={(e) => setworkType(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="In-Person">In-Person</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </select>
        <div className="flex flex-col justify-start items-start">
          <label
            htmlFor="countries_multiple"
            className="block mt-8 mb-2 text-sm font-medium text-black "
          >
            Choose your desired hourly pay rate
          </label>
        </div>
        <select
          id="countries"
          value={payRate}
          onChange={(e) => setpayRate(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="£10-£20">£10-£20</option>
          <option value="£21-£40">£21-£40</option>
          <option value="£41-£60">£41-£60</option>
          <option value="£61-£80">£61-£80</option>
          <option value={81}>£81-£100</option>
          <option value="Over £100">Over £100</option>
        </select>
        <div className="flex flex-col justify-start items-start">
          <label className="block mt-8 mb-2 text-sm font-medium text-black ">
            Where are you based?
          </label>
        </div>
        <div className="flex flex-col justify-start items-start">
          <label className="block mt-2 mb-2 text-sm font-medium text-black ">
            Country
          </label>
        </div>
        <Select
          id="country"
          name="country"
          className="rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2"
          options={updatedCountries}
          value={values.country}
          onChange={(value) => setFieldValue("country", value)}
        />
        <div className="flex flex-col justify-start items-start">
          <label className="block mt-2 mb-2 text-sm font-medium text-black">
            Region
          </label>
        </div>
        <Select
          id="state"
          name="state"
          className="rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2"
          options={updatedStates(values.country ? values.country.value : null)}
          value={values.state}
          onChange={(value) => setFieldValue("state", value)}
        />
        <div className="flex flex-col justify-start items-start">
          <label className="block mt-2 mb-2 text-sm font-medium text-black ">
            City
          </label>
        </div>
        <Select
          id="city"
          name="city"
          className="rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2"
          options={updatedCities(values.state ? values.state.value : null)}
          value={values.city}
          onChange={(value) => setFieldValue("city", value)}
        />
        <div className="mt-4">
          <button
            type="button"
            className=" font-bold uppercase text-sm px-6 py-3
          rounded shadow hover:shadow-lg outline-none focus:outline-none
          mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={collectData}
          >
            Save my changes!
          </button>
        </div>
      </form>
    </div>
  );
}
export default PersonalDetails;
