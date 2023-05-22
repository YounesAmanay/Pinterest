import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../../fragments/Avatar";
import useImage from "../../../../../costumHooks/useImage";
import "./card.css";
import useUserImage from "../../../../../costumHooks/useUserImage";
import useFormattedDate from "../../../../../costumHooks/useFormattedDate ";


function Card({ pin }) {
  const { id, title, image_height, user_id, user_name, created_at } = pin;
  const { image: pin_img, isLoading: isImageLoading } = useImage(id);
  const { isLoading, image } = useUserImage(user_id);
  const formattedDate = useFormattedDate(created_at);

  return (
    <Link to={`pin/${id}`}>
      <div className="pin-container">
        {isImageLoading ? (
          <div className="pin-placeholder" style={{ height: image_height }}></div>
        ) : (
          <img src={pin_img} alt="pin" />
        )}
        <div className="pin-overlay">
          <div className="overley-header">
            <div className="category-list">default</div>
            <button className="save">save</button>
          </div>
          <div className="info">
            <p className="title">{title}</p>
            <div className="info-footer">
              <div className="user">
                {isLoading ? (
                  <div className="pin-avatar-placeholder">{user_name.charAt(0)}</div>
                ) : (
                  <div className="avatar-img">
                    <img src={image} alt="User profile" />
                  </div>
                )}
                <p className="user-name">{user_name}</p>
              </div>
              <p className="pin-date">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
