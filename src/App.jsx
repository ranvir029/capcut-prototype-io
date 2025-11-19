import React from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Prompt from "./components/Prompt";
import MyPosts from "./components/MyPosts";
import Contact from "./components/Contact";
import Myprofile from "./components/Myprofile"; 
import PublicProfile from "./components/PublicProfile"
import Freelancer from "./components/Freelancer";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavBar />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/prompt" element={<Prompt />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/myProfile" element={<Myprofile />} />
        <Route path="/profile/:username" element={<PublicProfile />} />
        <Route path="/freelancer" element={<Freelancer/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
