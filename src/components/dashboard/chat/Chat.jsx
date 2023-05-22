import React, { useEffect, useState } from "react";
import "./chat.css";
import Search from "./search/Search";
import { BiMessageSquareEdit } from "react-icons/bi";
import ChatItem from "./chat-item/ChatItem";
import useUserChats from "../../../costumHooks/useUserChats";
import Messages from "./messages/Messages";
import { useDispatch, useSelector } from "react-redux";

function Chat() { 
  const { chats } = useUserChats();
  const dispatch = useDispatch();
  const chatID = chats[0]?.id;
  const userID = chats[0]?.user_id
  const [searchTerm, setSearchTerm] = useState("");
  const filteredChats = chats.filter(chat =>
    chat.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (chatID) {
      dispatch({ type: 'SELECT_CHAT',chatID:chatID , chat_user:userID });
    }
  }, [chatID, dispatch]);

  return (
    <div className="chat-container">
      <div className="chats">
        <div className="chats-header">
          <Search 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div className="chats-list">
          {filteredChats.length>0 ? (
            filteredChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))
          ) : (
            <div className="no-chats">No chats available.</div>
          )}
        </div>
      </div>
      <div className="messages">
        {chats&&<Messages/>}
      </div>
    </div>
  );
}

export default Chat;
