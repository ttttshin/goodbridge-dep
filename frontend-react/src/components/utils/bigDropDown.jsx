import React from 'react';
import { useState, useRef, useEffect } from "react";

export default function BigDropDown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="inline-flex w-full justify-center rounded-lg text-sm font-medium"
        onClick={toggleDropdown}
      >
        {// eslint-disable-next-line
        props.title}
      </button>
      <div className={`absolute p-3 -mx-[130px]  ${isOpen ? "" : "hidden"}`}>
        <div className="bg-offwhite2 flex flex-row w-[270px] h-auto items-center rounded">
          <div
            className=" w-full p-4 text-sm hover:text-GoodBridge_Orange focus-within:font-bold"
          >
            {// eslint-disable-next-line
            props.option1}
          </div>
          <div
            className=" w-full p-4 text-sm hover:text-GoodBridge_Orange focus-within:font-bold"
          >
            {// eslint-disable-next-line
            props.option2}
          </div>
        </div>  
      </div>
    </div>
  );
}
