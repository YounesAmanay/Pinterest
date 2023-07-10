import { useState } from 'react';
import axios from 'axios';

function useCreateBoard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBoard = async (name, secret) => {
    setLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/board', { name, secret }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setData(response.data.board);
      return response.data.board;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  

  return { data, loading, error, createBoard };
}
export default useCreateBoard;