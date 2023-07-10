import { useState } from 'react';
import axios from 'axios';

const useToggleFollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleFollow = async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const options = {
        url: `http://localhost:8000/api/follow/${userId}`,
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
      await axios(options);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return { loading, error, toggleFollow };
}

export default useToggleFollow;
