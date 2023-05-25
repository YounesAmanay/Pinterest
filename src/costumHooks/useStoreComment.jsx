import { useState } from 'react';
import axios from 'axios';

const useStoreComment = (pinId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const storeComment = async (content) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const options = {
        url: `http://localhost:8000/api/pin/${pinId}/comment`,
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        data: {
          content,
        },
      };
      await axios(options);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return { loading, error, storeComment };
}

export default useStoreComment;
