import React from "react";
import { FaTwitter, FaFacebookF, FaLinkedin } from "react-icons/fa";

function ContactPage() {
  return (
    <div className="flex flex-col justify-center font-style: italic items-center h-screen space-y-5 ">
      <h1 className="text-4xl font-bold  text-black">Contact Us</h1>

      <div className="box-content flex flex-col mt-5 mb-0.5 items-center rounded-lg ">      
        
        <div className="flex flex-col items-center justify-center space-y-5 p-20 bg-offwhite drop-shadow-lg rounded-lg">
        <p className="text-xl  text-black">We are here to help!</p>
          <div className="flex flex-row items-center space-x-5">
            <a
              href="emma@goodbridge.work"
              target="_blank"
              rel="noreferrer noopener"
            >
              <p className="text-xl  text-black">emma@goodbridge.work</p>
            </a>
          </div>
          <div className="flex flex-row items-center space-x-5">
            <FaTwitter className="text-4xl  text-black" />
            <a
              href="https://twitter.com/goodbridgework"
              target="_blank"
              rel="noreferrer noopener"
            >
              <p className="text-xl  text-black">Twitter</p>
            </a>
          </div>
          <div className="flex flex-row items-center space-x-5">
            <FaFacebookF className="text-4xl  text-black" />
            <a
              href="https://www.facebook.com/GoodBridge.work"
              target="_blank"
              rel="noreferrer noopener"
            >
              <p className="text-xl  text-black">Facebook</p>
            </a>
          </div>
          <div className="flex flex-row items-center space-x-5">
            <FaLinkedin className="text-4xl  text-black" />
            <a
              href="https://www.linkedin.com/company/goodbridge/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <p className="text-xl  text-black">Linkedin</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
