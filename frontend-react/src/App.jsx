import React from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Homepage from "./components/pages/homepage";
import About from "./components/pages/about";
import ContactPage from "./components/pages/contactpage";
import News from "./components/pages/news";
import Login from "./components/pages/login";
import SignUp from "./components/pages/signUp";
import LandingPageGoodFriends from "./components/pages/goodFriends/landingPage";
import ProfilePage from "./components/pages/profilePage";
import PrivateComponent from "./components/utils/PrivateComponent";
import PrivateNavBar from "./components/utils/PrivateNavBar";
import MatchPageGoodFriends from "./components/pages/goodFriends/matchPage";
import MatchesPageGoodFriends from "./components/pages/goodFriends/matchesPage";
import Resendemail from "./components/pages/ResendEmail";
import ComingSoon from "./components/pages/goodWork/comingSoon";
import ForgotPasswordSend from "./components/pages/forgotPasswordSend";
import ForgotPasswordChange from "./components/pages/forgotPasswordChange";
import ForYouPage from "./components/pages/goodBridgeLibrary/forYouPage";
// this is the new page admin page we add:
import AdminPage from "./components/pages/adminPage";


function App() {
  const path = useLocation();
  const whichGood = () => {
    if (path.pathname.includes("goodFriends")) {
      return false;
    } else {
      return true;
    }
  };

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (localStorage.getItem("user")) {
      // eslint-disable-next-line
      const value = fetch(`${process.env.REACT_APP_BACKEND_URL}/ResendEmail`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          email: user.email,
        },
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          if (responseJSON === false) {
            navigate("/ResendEmail");
          }
        });
    }
  });

  return (
    <div
      className={`${
        whichGood()
          ? "bg-[url('./components/images/background.jpg')] w-screen"
          : "bg-[url('./components/images/goodFriendsBackground.jpg')]  w-screen"
      } &&
      bg-cover h-screen overflow-y-scroll overflow-x-hidden`}
    >
      <PrivateNavBar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route
            path="/goodFriends/landingPage"
            element={<LandingPageGoodFriends />}
          />
          <Route path="/goodFriends/profilePage" element={<ProfilePage />} />
          <Route
            path="/goodFriends/matchPage"
            element={<MatchPageGoodFriends />}
          />
          <Route
            path="/goodFriends/matchesPage"
            element={<MatchesPageGoodFriends />}
          />
          
          <Route path="/goodWork/comingSoon" element={<ComingSoon />} />
          <Route path="/logout" />
          <Route path="/resendemail" element={<Resendemail />} />
          <Route path = "/admin" element={<AdminPage/>}/>
        </Route>
      </Routes>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/forYou" element={<ForYouPage/>} />
        <Route path="/contactUs" element={<ContactPage />} />
        <Route path="/news" element={<News />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPasswordSend" element={<ForgotPasswordSend />} />
        <Route path="/forgotPasswordChange" element={<ForgotPasswordChange />} />
      </Routes>
    </div>

  );
}

export default App;
