import { useEffect, useState } from "react";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from "react-redux";

const useChatMessages = (chatID, posted ,setPosted) => {
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const load = useSelector((state) => state.load);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `http://localhost:8000/api/chat/${chatID}`,
          {
            headers,
          }
        );

        setMessages(response.data.messages);
        setUserName(response.data.user_name);
        setUserId(response.data.user_id);
        setIsLoading(false);
        // dispatch({ type: "SHOULD_LOAD", load: !load });
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchChatMessages();
  }, [chatID , load ,posted]);

  useEffect(() => {
    window.Echo.channel(`chat.${chatID}`)
      .listen("NewMessage", (event) => {
        dispatch({ type: "SHOULD_LOAD", load: !load });
        setMessages((messages) => [...messages, event.message]);
      })
      .listen("MessageDeleted", (event) => {
        setPosted(!posted)
        dispatch({ type: "SHOULD_LOAD", load: !load });
        setMessages((messages) =>
          messages.filter((message) => message.id !== event.message.id)
        );
       
      });

    return () => {
      // unsubscribe from the chat channel
      window.Echo.leave(`chat.${chatID}`);
    };
  }, [chatID]);

  return { messages, userName, userId, isLoading };
};

export default useChatMessages;
