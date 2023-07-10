import { useState, useEffect } from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux'

function useFetchBoards(showAddBoard ,laod) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/board', {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        setData(response.data.boards);
        dispatch({type:'SET_BOARDS',boards : response.data.boards})
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, [showAddBoard ,laod]);

  return { data, loading, error };
}

export default useFetchBoards;