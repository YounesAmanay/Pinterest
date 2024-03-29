import React from "react";
import "./avatar.css";
import Highlighter from "react-highlight-words";
import useUserImage from "../../costumHooks/useUserImage";

function Avatar({ user, searchTerm }) {
  const { id, name } = user;
  const {image } = useUserImage(id)

  return (
    

      <div className="avatar">
        {image ? (
          <img src={image} alt={name} className="avatar-image" />
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
