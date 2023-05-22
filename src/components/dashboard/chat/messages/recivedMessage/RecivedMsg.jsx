import React from "react";

function RecivedMsg({message}) {
  const date = useFormattedDate(message.created_at);

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
        <div className="msg-date">{date}</div>
        <div className="msg-delete">
          <RiChatDeleteLine />
        </div>
      </div>
    </div>
  );
}

export default RecivedMsg;
