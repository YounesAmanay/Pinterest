import React, { useEffect, useState } from "react";
import "./chat.css";
import Search from "./search/Search";
import { BiMessageSquareEdit } from "react-icons/bi";
import ChatItem from "./chat-item/ChatItem";
import useUserChats from "../../../costumHooks/useUserChats";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./messages/Messages";

function Chat() { 
  const { chats } = useUserChats();
  const dispatch = useDispatch();
  const copy = useSelector((state)=>state.chat_user)
  const copy_name = useSelector((state)=>state.chat_user_name)
  const chatID = chats[0]?.id;
  const userID = chats[0]?.user_id
  const userName = chats[0]?.user_name
  // console.log(chats[0]?.user_name)
  const [searchTerm, setSearchTerm] = useState("");
  const filteredChats = chats.filter(chat =>
    chat.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (chatID && !copy) {
      dispatch({ type: 'SELECT_CHAT',chatID:chatID , userID:userID , name:userName});
      console.log(userName)
    }
  },[chatID ,dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(filteredChats.length>0){
      dispatch({ type: 'SELECT_CHAT',chatID:filteredChats[0].id , userID:filteredChats[0].user_id , name:filteredChats[0].user_name})
    }
    setSearchTerm("");
  }

  return (
    <div className="chat-container">
      <div className="chats">
        <div className="chats-header">
          <Search 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSubmit={handleSubmit}
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
