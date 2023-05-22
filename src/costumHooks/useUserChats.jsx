import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function useUserChats() {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const load = useSelector((state)=>state.load)
  const selectedChat = useSelector((state) => state.selectedChat);



  useEffect(() => {
    async function fetchChats() {
      const token = localStorage.getItem('token');

      const options = {
        url: 'http://localhost:8000/api/chat',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      try {
        const response = await axios(options);
        setChats(response.data.data);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }

    fetchChats();
  },[load , selectedChat]);

  return { chats, isLoading };
}

export default useUserChats;
