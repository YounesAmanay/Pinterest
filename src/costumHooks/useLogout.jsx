import { useCallback } from "react";
import axios from "axios";
import { Navigate, Outlet, useLocation } from 'react-router-dom';"react-router-dom";

function useLogout() {
  const location = useLocation();
  const logout = useCallback(() => {
    const token = localStorage.getItem("token");

    const options = {
      url: "http://localhost:8000/api/auth/logout",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(options)
      .then((response) => {
        localStorage.removeItem("token");
        Navigate('/sign-in')
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return logout;
}

export default useLogout;
