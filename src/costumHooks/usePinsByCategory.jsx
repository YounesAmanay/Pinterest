import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

function usePinsByCategory(categoryId) {
  const [pins, setPins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const options = {
      url: `http://localhost:8000/api/category/${categoryId}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (categoryId) {
      axios(options)
        .then((response) => {
          setPins(response.data);
          dispatch({ type: "SET_PINS", pins: response.data });
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  }, [categoryId]);

  return { isLoading };
}

export default usePinsByCategory;
