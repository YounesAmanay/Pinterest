import React, { useEffect, useState } from "react";
import useFormattedDate from "../../../../../../../costumHooks/useFormattedDate ";
import { MdDelete } from "react-icons/md";
import useUserImage from "../../../../../../../costumHooks/useUserImage";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useDeleteComment from "../../../../../../../costumHooks/useDeleteComment";

function Item({ comment }) {
  const { image: senderImg } = useUserImage(comment.user_id);
  const formattedDate = useFormattedDate();
  const date = formattedDate(comment.created_at);
  const authId = useSelector((state) => state.authUser);
  const [isTrue ,setIsTrue]=useState(false)
  const { deleteComment ,loading} = useDeleteComment(comment.pin_id);
  const dispatch = useDispatch()


  useEffect(()=>{
    if(authId=== comment.user_id){
      setIsTrue(true)
    }
  },[comment.user_id , authId , comment])

  const handleDeleteClick = async () => {
    await deleteComment(comment.id);
    dispatch({ type: 'SET_MESSAGES', message: 'Comment deleted' });
  };
  

  return (
    <div className="c-item">
      <Link to={`/profile/${comment.user_id}`} className="user-avatar">
        {senderImg ? (
          <img src={senderImg} className="avatar-image" />
        ) : (
          <div className="avatar-placeholder">
            {comment.user.name.charAt(0)}
          </div>
        )}
      </Link>
      <div className="c-details">
        <div className="c-u-name">{comment.user.name}</div>
        <div className="c-content">{comment.content}</div>
        <div className="c-bottom">
          <p className="c-date">{date}</p>
          {isTrue && (
            <div onClick={handleDeleteClick} disabled={loading}  className="c-delete">
              <MdDelete />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Item;
