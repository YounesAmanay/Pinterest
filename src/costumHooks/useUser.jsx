import { useState, useEffect } from 'react';
import axios from 'axios';

function useUser(userId) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('token');

      const options = {
        url: `http://localhost:8000/api/user/${userId}`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      try {
        const response = await axios(options);
        console.log(response)
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }

    fetchUser();
  }, [userId]);

  return { user, isLoading };
}

export default useUser;
