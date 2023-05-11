import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/sign in/SignIn";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/PrivateRoute"
import SignUp from "./components/sign up/SignUp";

function App() {

  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        {/* <Route path="/pinterest" element={<PrivateRoute />}> */}
          <Route index element={<Dashboard />}/>
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
