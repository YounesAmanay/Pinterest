import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function useSearchPins(query) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchSearchPins() {
      const token = localStorage.getItem('token');

      const options = {
        url: 'http://localhost:8000/api/search',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        data: {
          q: query,
        },
      };

      try {
        const response = await axios(options);
        console.log(response.data)
        dispatch({type:'SEARCH',searchPins:response.data})
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }

    fetchSearchPins();
  }, [query]);

  return {  isLoading };
}

export default useSearchPins;
