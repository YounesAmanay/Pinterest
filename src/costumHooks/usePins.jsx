  import { useState, useEffect } from "react";
  import axios from "axios";

  function usePins(id) {
    const [pins, setPins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (id) {
        // Fetch a specific pin by ID
        const options = {
          url: `http://localhost:8000/api/pin/${id}`,
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        };

        axios(options)
          .then((response) => {
            setPins([response.data]);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
          });
      } else {
        // Fetch all pins
        const options = {
          url: "http://localhost:8000/api/home",
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        };

        axios(options)
          .then((response) => {
            setPins(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }
    }, [id]);

    return { pins, isLoading };
  }

  export default usePins;
