import { useState,useEffect } from "react";
import axios from "axios";
function useCategories() {

  const [categories, setCategories] = useState([]);

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
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return categories;
}
export default useCategories;