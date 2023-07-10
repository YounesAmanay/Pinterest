import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function usePins(id) {
  const [pins, setPins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const search = useSelector((state) => state.search);
  const pinsLoad = useSelector((state) => state.pinsLoad);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const options = {
      url: "http://localhost:8000/api/home",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


      if (!selectedCategory && !search) {
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

  }, [id, selectedCategory, pinsLoad ,search]);

  return { pins, isLoading };
}

export default usePins;
