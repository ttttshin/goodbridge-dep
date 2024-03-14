import { React, useState, useRef, useEffect } from "react";


export default function DropDown(props) {
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        className="inline-flex w-full justify-center rounded-md text-sm font-medium "
        onClick={toggleDropdown}
      >
        {// eslint-disable-next-line
        props.title}
      </button>

      <div
        className={`absolute ${
          // eslint-disable-next-line
          props.side}-0 z-10 mt-2 w-56 ${
          isOpen ? "" : "hidden"
        } origin-top-${
          // eslint-disable-next-line
          props.side} rounded-md bg-white focus:outline-none `}
      >
        <div className="bg-offwhite2 rounded-lg">
          <div className="px-4 py-2 text-sm">{
          // eslint-disable-next-line
          props.card}</div>
          <a href="/" className="block w-full px-4 py-2 text-left text-sm">
            {// eslint-disable-next-line
            props.option1}
          </a>
          <a href="/" className="block w-full px-4 py-2 text-left text-sm">
            {// eslint-disable-next-line
            props.option2}
          </a>
          {// eslint-disable-next-line
          props.option3 && (
            <a href="/" className="block w-full px-4 py-2 text-left text-sm">
              {// eslint-disable-next-line
              props.option3}
            </a>
          )}
          {// eslint-disable-next-line
          props.option4 && (
            <a href="/" className="block w-full px-4 py-2 text-left text-sm">
              {// eslint-disable-next-line
              props.option4}
            </a>
          )}
          {// eslint-disable-next-line
          props.option5 && (
            <a href="/" className="block w-full px-4 py-2 text-left text-sm">
              {// eslint-disable-next-line
              props.option5}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
