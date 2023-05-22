import {react , useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/sign in/SignIn";
import PrivateRoute from "./components/PrivateRoute"
import SignUp from "./components/sign up/SignUp";
import Content from "./components/dashboard/content/Content";
import Profile from "./components/dashboard/profile/profile";
import Nav from "./components/dashboard/nav/Nav";
import Confirmation from "./components/dashboard/nav/confirmation/Confirmation";
import ViewPin from "./components/dashboard/content/gallery/card/viewPin/ViewPin";
import usePins from "./costumHooks/usePins";
import { useDispatch } from "react-redux";
import Chat from "./components/dashboard/chat/Chat";

function App() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { pins } = usePins();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_PINS', pins });
  }, [dispatch, pins]);
  
  const handleLogout = () => {
    setShowConfirmation(true);
    };
  return (
    <>
    <Routes>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
    </Routes>
    <div className="dashboard">
      <Nav  onLogout={handleLogout} />
      {showConfirmation && 
      <Confirmation
      setShowConfirmation={setShowConfirmation}
       />}
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route index element={<Content />} />
          <Route path="/profile/:id" element={<Profile />}/> 
          <Route path="/profile" element={<Profile />}/> 
          <Route path="/pin/:id" element={<ViewPin/>}/> 
          <Route path="/chat" element={<Chat/>}/>
        </Route>
      </Routes>
    </div>
    </>
    
  );
}

export default App;
