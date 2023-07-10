import { useState,useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
function useCategories() {
  const dispatch = useDispatch();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const options = {
      url: "http://localhost:8000/api/category",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(options)
      .then((response) => {
      
    dispatch({type: 'SET_CATEGORIES', categories:response.data.data})

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return null;
}
export default useCategories;