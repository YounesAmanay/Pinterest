import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import "./messages.css";
import { useDispatch, useSelector } from "react-redux";
import useChatMessages from "../../../../costumHooks/useChatMessages ";
import useUserImage from "../../../../costumHooks/useUserImage";
import Loader from "../../../fragments/Loader";
import usePostMessage from "../../../../costumHooks/usePostMessage";
import { RiChatDeleteLine } from "react-icons/ri";
import useFormattedDate from "../../../../costumHooks/useFormattedDate ";
import useDeleteMessage from "../../../../costumHooks/useDeleteMessage";

function Messages() {
  const selectedChat = useSelector((state) => state.selectedChat);
  const authID = useSelector((state) => state.authUser);
  const [posted, setPosted] = useState(false);
  const { messages, isLoading, userName, userId } = useChatMessages(
    selectedChat,
    posted
  );
  const formattedDate = useFormattedDate();
  const load = useSelector((state) => state.load);
  const dispatch = useDispatch();
  const { image: senderImg } = useUserImage(userId);
  const { image: receiverImg } = useUserImage(authID);
  const [msg, setMsg] = useState("");
  const { postMessage } = usePostMessage();
  const deleteMessage = useDeleteMessage();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    postMessage(userId, msg)
      .then(() => {
        setPosted(!posted);
        setMsg("");
        dispatch({ type: "SHOULD_LOAD", load: !load });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteClick = (id) => {
    deleteMessage(id);
    console.log(id)
    setPosted(!posted);
    dispatch({ type: "SHOULD_LOAD", load: !load });
  };

  return (
    <div className="messages-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="messages-header">
            <div className="user-avatar">
              {senderImg ? (
                <img src={senderImg} className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">{userName.charAt(0)}</div>
              )}
            </div>
            <div className="user-name">{userName}</div>
          </div>

          <div className="messages-content">
            {messages.length > 0 ? (
              messages.map((message, index) => {
                {
                  const date = formattedDate(message.created_at);
                  if (authID !== message.sender_id) {
                    return (
                      <div className="received-msg">
                        <div className="user-avatar">
                          {senderImg ? (
                            <img src={senderImg} className="avatar-image" />
                          ) : (
                            <div className="avatar-placeholder">
                              {message.sender_name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="received-content">
                          {message.content}
                          <div className="msg-bottom">
                            <div className="msg-date">{date}</div>
                            <button onClick={()=>handleDeleteClick(message.id)} className="msg-delete">
                              <RiChatDeleteLine />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="sent-msg">
                        <div className="sent-content">
                          {message.content}
                          <div className="msg-bottom">
                            <button onClick={()=>handleDeleteClick(message.id)} className="msg-delete">
                              <RiChatDeleteLine />
                            </button>
                            <div className="msg-date">{date}</div>
                          </div>
                        </div>
                        <div className="user-avatar">
                          {receiverImg ? (
                            <img src={receiverImg} className="avatar-image" />
                          ) : (
                            <div className="avatar-placeholder">
                              {message.receiver_name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                }
              })
            ) : (
              <div className="no-chats"> Start a Conversation</div>
            )}
          </div>
          <div className="transparent">
            <form onSubmit={(e) => handleSubmit(e)} className="messages-footer">
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit" className="send">
                <AiOutlineSend />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Messages;
