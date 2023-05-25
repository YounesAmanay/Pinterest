import { useState } from 'react';
import axios from 'axios';

const useCreatePin = () => {
  const [newPin, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createPin = async (pinData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/pin', pinData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data.data);
      console.log(newPin)

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return { newPin, error, loading, createPin };
}

export default useCreatePin;
