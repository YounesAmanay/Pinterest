import { useState } from "react";
import axios from "axios";

const usePostMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postMessage = async (receiverId, body) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const data = {
        receiver_id: receiverId,
        body: body,
      };

      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/message",
        data,
        {
          headers,
        }
      );

      setIsLoading(false);
      return response.data;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { postMessage, isLoading, error };
};

export default usePostMessage;
