import { useState } from "react";
import axios from "axios";

const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async (image) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("profile", image);

      const response = await axios.post(
        `http://localhost:8000/api/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      return response.data;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, error };
};

export default useUpdateProfile;
