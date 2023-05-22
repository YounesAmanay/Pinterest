import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function usePinsByCategory(categoryId) {
  const [pins ,setPins]=useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const options = {
      url: `http://localhost:8000/api/category/${categoryId}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios(options)
      .then((response) => {
        setPins(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [categoryId, setPins]);

  return { isLoading ,pins};
}

export default usePinsByCategory;
