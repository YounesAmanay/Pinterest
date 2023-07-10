import { useState } from 'react';
import axios from 'axios';

const useCheckFollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  const checkFollow = async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const options = {
        url: `http://localhost:8000/api/follow/${userId}`,
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
      const response = await axios(options);
      setIsFollowed(response.data.isFollowed);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return { loading, error, isFollowed, checkFollow };
}

export default useCheckFollow;
