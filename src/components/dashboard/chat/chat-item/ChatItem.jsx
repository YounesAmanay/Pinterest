import React from "react";
import useUserImage from "../../../../costumHooks/useUserImage";
import useFormattedDate from "../../../../costumHooks/useFormattedDate ";
import { useSelector, useDispatch } from "react-redux";


function ChatItem({ chat }) {
  const { isLoading, image } = useUserImage(chat.user_id);
  const selectedChat = useSelector((state) => state.selectedChat);
  const date = useFormattedDate(chat.date);
  const hasUnreadCount = chat.unread_count > 0;
  const isSelected = selectedChat === chat.id;
  const dispatch = useDispatch();

  const handleChatItemClick = () => {
    dispatch({type: 'SELECT_CHAT',chatID:chat.id ,userID:chat.user_id});
  };

  return (
    <div
      className={`chat-item ${hasUnreadCount ? "unread" : ""} ${
        isSelected ? "selected" : ""
      }`}
      onClick={handleChatItemClick}
    >
      <div className="user-avatar">
        {image ? (
          <img src={image} className="avatar-image" alt="User Avatar" />
        ) : (
          <div className="avatar-placeholder">{chat.user_name.charAt(0)}</div>
        )}
      </div>
      <div className="chat-item-details">
        <div className="user-name">{chat.user_name}</div>
        <div className="last-message">{chat.last_message}</div>
      </div>
      <div className="chat-stats">
        {hasUnreadCount && <div className="unread-count">{chat.unread_count}</div>}
        <div className="received-at">{date}</div>
      </div>
    </div>
  );
}

export default ChatItem;
