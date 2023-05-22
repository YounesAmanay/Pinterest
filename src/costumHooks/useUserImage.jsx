import { useState, useEffect } from 'react';
import axios from 'axios';

function useUserImage(userId) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchImage() {
      const token = localStorage.getItem('token');

      const options = {
        url: `http://localhost:8000/api/profile/${userId}`,
        method: 'GET',
        responseType: 'blob',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      try {
        const response = await axios(options);
        const imageUrl = URL.createObjectURL(response.data);
        setImage(imageUrl);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }

    fetchImage();
  }, [userId]);

  return { image, isLoading };
}

export default useUserImage;
