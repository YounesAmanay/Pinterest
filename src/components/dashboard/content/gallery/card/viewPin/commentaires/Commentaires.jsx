import React, { useState } from "react";
import "./commentaires.css";
import { AiOutlineSend } from "react-icons/ai";
import Item from "./Item";

function Commentaires({ comments ,isTrue}) {
  

  return (
    <div className="c-container">
      
      <div className="c-box">
      <div className="title">Commentaires</div>
        {comments && comments.map((comment, index) => {
          return (
            <Item key={index} comment={comment} />
          )
        })}
      </div>
    </div>
  );
}

export default Commentaires;
