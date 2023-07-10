import React ,{useState} from "react";
import { Link } from "react-router-dom";
import useImage from "../../../../../costumHooks/useImage";
import "./card.css";
import useUserImage from "../../../../../costumHooks/useUserImage";
import { BsHeart, FiShare, BsThreeDotsVertical } from "react-icons/all";
import useFetchBoards from "../../../../../costumHooks/useFetchBoards";
import useRepin from "../../../../../costumHooks/useRepin";

import {useSelector} from 'react-redux'

function Card({ pin }) {
  const { id, title, image_height, user_id, user_name, created_at } = pin;
  const { image: pin_img, isLoading: isImageLoading } = useImage(id);
  const { isLoading, image } = useUserImage(user_id);
  const boards = useSelector((state) => state.boards);
  const [selectedBoard, setSelectedBoard] = useState("");

  const { repin, loading, error } = useRepin();

 const handleSave = async()=>{
    const data = await repin(id , selectedBoard);
    
 }

  return (
    <div className="pin-container ">
      {isImageLoading ? (
        <div className="pin-placeholder" style={{ height: image_height }}></div>
      ) : (
        <Link to={`pin/${id}`}>
          <img src={pin_img} alt="pin" />
        </Link>
      )}
      <div className="pin-overlay">
        <div className="overley-header">
          <select className="category-list"
            value={selectedBoard}
            onChange={(e)=>setSelectedBoard(e.target.value)}
          >
            <option
             value="default">.</option>
            {boards &&
              boards.map((board) => (
                <option key={board?.id} value={board?.id}>
                  {board?.name}
                </option>
              ))}
          </select>
          <button className="save">
            Save
          </button>
        </div>
        <div className="overlay-footer">
          <div className="user">
            {isLoading ? (
              <div className="pin-avatar-placeholder">{user_name.charAt(0)}</div>
            ) : (
              <Link to={`profile/${user_id}`} className="avatar-img">
                <img src={image} alt="User profile" />
              </Link>
            )}
          </div>
          <div className="card-options">
            <button className="icon-button share">
              <FiShare />
            </button>
            <button className="icon-button dots">
              <BsThreeDotsVertical />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
