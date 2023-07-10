
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
function useSearchPins(query, key) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchSearchPins() {
      // Return early if query is not set
      if (!query) {
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem('token');

      const options = {
        url: 'http://localhost:8000/api/search',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          q: query,
        },
      };

      try {
        const response = await axios(options);
        dispatch({ type: 'SET_PINS', pins: response.data });
        dispatch({ type: 'SEARCH', search: true });
        dispatch({ type: 'SELECT_CATEGORY', selectedCategory: null });
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }

    fetchSearchPins();
  }, [query, key]);

  return { isLoading };
}

export default useSearchPins;

