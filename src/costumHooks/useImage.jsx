import { useState, useEffect } from "react";
import axios from "axios";

function useImage(id) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const options = {
      url: `http://localhost:8000/api/pin/${id}/image`,
      method: "GET",
      responseType: "blob",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(options)
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        setImage(imageUrl);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        
      });
  }, [id]);

  return { image, isLoading };
}

export default useImage;
