  import { useState, useEffect } from "react";
  import axios from "axios";

  function usePins(id,pinsLoad) {
    const [pins, setPins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");
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
      
    }, [id,pinsLoad]);

    return { pins, isLoading };
  }

  export default usePins;
