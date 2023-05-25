import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function useCreateChat() {
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const load = useSelector((state)=>state.load)
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });

  const createChat = async (receiverId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/chat', { receiver_id: receiverId });
      setChatId(response.data.chat_id);
      dispatch({type: 'SELECT_CHAT',chatID:response.data.chat_id ,userID:receiverId , name:response.data.receiver_name});
      dispatch({ type: "SHOULD_LOAD", load: !load });
      console.log(response.data.chat_id)
      console.log(response)


      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { chatId, loading, error, createChat };
}
export default useCreateChat;