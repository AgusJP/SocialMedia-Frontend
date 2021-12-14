import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "../pages/Home/index.js";
import { SignUp } from "../pages/SignUp/index.js";
import { SignIn } from "../pages/SignIn/index.js";
import PrivateRoute from "./Route";
import "react-toastify/dist/ReactToastify.css";
import Post from "../pages/Post/index.js";
import Profile from "../pages/Profile/index.js";

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        draggable
      />
      <Routes>    
        <Route exact path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }/> 
        <Route exact path="/profile/:username" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }/> 
         <Route exact path="/post/:post_id" element={
          <PrivateRoute>
            <Post />
          </PrivateRoute>
        }/> 
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/signIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};
