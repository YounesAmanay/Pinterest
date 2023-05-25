import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function useCheckToken() {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkToken() {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsValid(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/auth/check', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setIsValid(response.data.valid);
  
        // console.log(authName)
        if (response.data.valid) {
          dispatch({ type: 'AUTHENTICATED_USER', auth: response.data.authUser ,authName:response.data.authName });
        }
      } catch (error) {
        console.error(error);
        setIsValid(false);
      }

      setIsLoading(false);
    }

    checkToken();
  });

  return { isValid, isLoading };
}

export default useCheckToken;