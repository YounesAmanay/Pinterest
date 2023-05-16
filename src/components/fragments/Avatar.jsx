import React from "react";
import "./avatar.css";
import Highlighter from "react-highlight-words";

function Avatar({ user, searchTerm }) {
  const { id, name, avatar } = user;

  return (
    

      <div className="avatar">
        {avatar ? (
          <img src={avatar} alt={name} className="avatar-image" />
        ) : (
          <div className="avatar-placeholder">{name.charAt(0)}</div>
        )}
        <div className="avatar-name">
        <Highlighter
          searchWords={[searchTerm]}
          textToHighlight={name}
          highlightClassName="highlighted-text"
        />
        </div>
      </div>

  );
}

export default Avatar;
