import { useEffect, useState } from "react";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from "react-redux";

const useChatMessages = (chatID, posted) => {
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

        dispatch({ type: "SHOULD_LOAD", load: !load });
        setMessages(response.data.messages);
        setUserName(response.data.user_name);
        setUserId(response.data.user_id);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchChatMessages();
  }, [chatID, posted , load]);

  useEffect(() => {
    // configure Laravel Echo
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "0dde047a945cb7363c43",
      wsHost: "127.0.0.1",
      cluster: "mt1",
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
    });
    window.Echo.channel(`chat.${chatID}`)
      .listen("NewMessage", (event) => {
        dispatch({ type: "SHOULD_LOAD", load: !load });
        setMessages((messages) => [...messages, event.message]);
    

      })
      .listen("MessageDeleted", (event) => {
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
