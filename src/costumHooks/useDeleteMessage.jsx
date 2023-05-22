import { useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function useDeleteMessage() {
  const load = useSelector((state)=>state.load);
  const dispatch = useDispatch()

  const deleteMessage = useCallback(async (messageId) => {

    const token = localStorage.getItem('token');

    
    try {
      const response = await axios.delete(`http://localhost:8000/api/message/${messageId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response)
      dispatch({ type: 'SHOULD_LOAD', load: !load });
    } catch (error) {
      // handle error response
      console.error(error);
    }
  }, []);

  return deleteMessage;
}

export default useDeleteMessage;
