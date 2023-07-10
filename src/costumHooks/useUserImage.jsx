import { useQuery } from 'react-query';
import axios from 'axios';

function useUserImage(userId, selectedImage) {
  const { data, isLoading } = useQuery(
    ['userImage', userId, selectedImage],
    async () => {
      const token = localStorage.getItem('token');
      const options = {
        url: `http://localhost:8000/api/profile/${userId}`,
        method: 'GET',
        responseType: 'blob',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios(options);
      return URL.createObjectURL(response.data);
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  );

  return {
    image: data,
    isLoading
  };
}

export default useUserImage;
