import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/sign in/SignIn";
import PrivateRoute from "./components/PrivateRoute"
import SignUp from "./components/sign up/SignUp";
import Content from "./components/dashboard/content/Content";
import Profile from "./components/dashboard/profile/profile";
import Nav from "./components/dashboard/nav/Nav";

function App() {

  return (
    <>
    <Routes>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
    </Routes>
    <div className="dashboard">
      <Nav/>
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route index element={<Content />} />
          <Route path="/profile/:id" element={<Profile />}/> 
          <Route path="/library" element={<Content />}/>
        </Route>
      </Routes>
    </div>
    </>
    
  );
}

export default App;
