import { useCallback } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';

function useLogout() {
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
        
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return logout;
}

export default useLogout;
