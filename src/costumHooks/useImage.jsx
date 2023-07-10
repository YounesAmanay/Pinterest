import { useQuery } from 'react-query';
import axios from 'axios';

function useImage(id) {
  const { data, isLoading } = useQuery(
    ['image', id],
    async () => {
      const token = localStorage.getItem('token');
      const options = {
        url: `http://localhost:8000/api/pin/${id}/image`,
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

export default useImage;
