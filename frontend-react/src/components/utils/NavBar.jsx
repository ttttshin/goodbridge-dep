import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logonavorange.png";

const NavBar = () => {
  return (
    <div className="fixed bg-offwhite2 text-black/80 p-1 w-full ">
      <ul className="flex gap-4 items-center">
        <li className="p-1 font-normal">
          <Link to="/" className="flex items-center">
            <span>
              <img src={logo} alt="logo" className="h-10 w-15" />
            </span>
          </Link>
        </li>
        <li className="text-black/20">|</li>
        <li className="mr-4">
          <Link to="/about" className="flex items-center" data-testid="admin-link">
          ‎ ‎ ‎ ‎About
          </Link>
        </li>
        <li className="text-black/20">|</li>
        <li className="mr-4">
          <Link to="/news" className="flex items-center" data-testid="news-link">
          ‎ ‎ ‎ ‎News
          </Link>
        </li>
        <li className="text-black/20">|</li>
        <li className="mr-4">
          <Link to="/contactUs" className="flex items-center" data-testid="contact-us-link">
          ‎ ‎ ‎ ‎Contact Us
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
