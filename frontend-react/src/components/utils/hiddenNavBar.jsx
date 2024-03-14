import React from "react";
import { Link } from "react-router-dom";
import goodFriendsLogo from "../images/goodFriendsLogo.png";
import goodBridgeLogo from "../images/logo.PNG";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsPeople } from "react-icons/bs";
//import { useLocation } from "react-router-dom";
import DropDown from "./dropDown";
import LogoutButton from "./logoutButton";
import ProfileSmallCard from "./profileSmallCard";
import BigDropDown from "./bigDropDown";

function NavBar() {
  // const path = useLocation(); I try to delete this line to fix lint error
  const isActive = (path) => {
    if (path === window.location.pathname) {
      return true;
    } else {
      return false;
    }
  };

  const whichGood = () => {
    return false;
  };

  return (
    <>
      {whichGood() ? (
        <div className="fixed text-black-500">
          <ul className="fixed p-2 grid grid-cols-3 items-center justify-center text-black-500 w-full bg-offwhite2">
            <li className="grid-cols-1 justify-start">
              <DropDown
                title={
                  <span>
                    <img
                      src={whichGood() ? goodBridgeLogo : goodFriendsLogo}
                      alt="logo"
                      className="h-10 w-15"
                    />
                  </span>
                }
                side="left"
                option1={
                  whichGood() ? (
                    <Link
                      to="/goodFriends/landingPage"
                      className="text-GoodBridge_Orange"
                    >
                      Good Friends
                    </Link>
                  ) 
                  : (
                    <Link
                      to="/goodWork/comingSoon"
                      className="text-GoodBridge_Green"
                    >
                      Good Work
                    </Link>
                  )
                }
                option2={<Link to="/about">About</Link>}
                option3={<Link to="/contactUs">Contact Us</Link>}
                option4={<Link to="/news"> News</Link>}
                option5={<Link to="/forYou"> Articles</Link>}
              />
            </li>
            <div className="col-span-1 flex justify-center">
              <li className="mr-8">
                <Link
                  to={
                    whichGood()
                      ? "/goodWork/comingSoon"
                      : "/goodFriends/landingPage"
                  }
                >
                  <AiOutlineHome
                    className={`h-7 w-7 ${
                      isActive("/goodFriends/landingPage") &&
                      "text-GoodBridge_Orange underline decoration-GoodBridge_Orange decoration-2 underline-offset-2"
                    }
              }`}
                  />
                </Link>
              </li>
              <li className="mr-8">
                <BsPeople
                  className={`h-7 w-7 ${
                    (isActive("/goodFriends/matchPage") &&
                      "text-GoodBridge_Orange underline decoration-GoodBridge_Orange decoration-2 underline-offset-2 cursor-pointer") ||
                    (isActive("/goodFriends/matchesPage") &&
                      "text-GoodBridge_Orange underline decoration-GoodBridge_Orange decoration-2 underline-offset-2")
                  }`}
                />
              </li>
              <li className="mr-8">
                {whichGood() ? (
                  <Link to="/goodWork/comingSoon">
                    <CgProfile className="h-7 w-7" />
                  </Link>
                ) : (
                  <Link
                    to="/goodFriends/profilePage"
                    className={`${
                      isActive("/goodFriends/profilePage") &&
                      "text-GoodBridge_Orange underline decoration-GoodBridge_Orange decoration-2 underline-offset-2"
                    }`}
                  >
                    <CgProfile className="h-7 w-7" />
                  </Link>
                )}
              </li>
            </div>
            <li className="col-span-1 justify-self-end">
              <DropDown
                title={<AiOutlineSetting className="h-7 w-7" />}
                side="right"
                option1={<ProfileSmallCard />}
                option5={<LogoutButton />}
              />
            </li>
          </ul>
        </div>
      ) : (
        <div className="fixed text-black-500">
          <ul className="fixed p-2 grid grid-cols-3 items-center justify-center text-black-500 w-full bg-offwhite2">
            <li className="grid-cols-1 justify-start">
              <DropDown
                title={
                  <span>
                    <img
                      src={whichGood() ? goodBridgeLogo : goodFriendsLogo}
                      alt="logo"
                      className="h-10 w-15"
                    />
                  </span>
                }
                side="left"
                // option1={
                //   whichGood() ? (
                //     <Link
                //       to="/goodFriends/landingPage"
                //       className="text-GoodBridge_Orange"
                //     >
                //       Good Friends
                //     </Link>
                //   ) : (
                //     <Link
                //       to="/goodWork/comingSoon"
                //       className="text-GoodBridge_Green"
                //     >
                //       Good Work
                //     </Link>
                //   )
                // }
                option1={<Link to="/about">About</Link>}
                option2={<Link to="/contactUs">Contact Us</Link>}
                option3={<Link to="/news"> News</Link>}
                option4={<Link to="/forYou"> Articles</Link>}
              />
            </li>
            <div className="col-span-1 flex justify-center">
              <li className="mr-8">
                <Link
                  to={
                    whichGood()
                      ? "/goodWork/comingSoon"
                      : "/goodFriends/landingPage"
                  }
                >
                  <AiOutlineHome
                    className={`h-7 w-7 ${
                      isActive("/goodFriends/landingPage") &&
                      "text-GoodBridge_Orange underline decoration-GoodBridge_Orange decoration-2 underline-offset-8"
                    }
              }`}
                  />
                </Link>
              </li>
              <li className="mr-8">
                <BigDropDown
                  title={
                    <BsPeople
                      className={`h-7 w-7 ${
                        (isActive("/goodFriends/matchPage") &&
                          "text-GoodBridge_Orange underline decoration-GoodBridge_Orange decoration-2 underline-offset-8 cursor-pointer") ||
                        (isActive("/goodFriends/matchesPage") &&
                          "text-GoodBridge_Orange underline decoration-GoodBridge_Orange decoration-2 underline-offset-8")
                      }`}
                    />
                  }
                  option1={
                      <Link
                        to="/goodFriends/matchPage"
                        className={`${
                          isActive("/goodFriends/matchPage") &&
                          "text-GoodBridge_Orange underline decoration-GoodBridge_Orange decoration-2 underline-offset-8"
                        }`}
                      >
                        Match Page
                      </Link>
                  }
                  option2={
                      <Link
                        to="/goodFriends/matchesPage"
                        className={`${
                          isActive("/goodFriends/matchesPage") &&
                          "text-GoodBridge_Orange underline decoration-GoodBridge_Orange decoration-2 underline-offset-8"
                        }`}
                      >
                        Matches Page
                      </Link>
                  }
                />
              </li>
              <li className="mr-8">
                {whichGood() ? (
                  <Link to="/goodWork/comingSoon">
                    <CgProfile className="h-7 w-7" />
                  </Link>
                ) : (
                  <Link
                    to="/goodFriends/profilePage"
                    className={`${
                      isActive("/goodFriends/profilePage") &&
                      "text-GoodBridge_Orange underline decoration-GoodBridge_Orange decoration-2 underline-offset-8"
                    }`}
                  >
                    <CgProfile className="h-7 w-7" />
                  </Link>
                )}
              </li>
            </div>
            <li className="col-span-1 justify-self-end">
              <DropDown
                title={<AiOutlineSetting className="h-7 w-10" />}
                side="right"
                card={<ProfileSmallCard />}
                option1={<LogoutButton />}
              />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default NavBar;
