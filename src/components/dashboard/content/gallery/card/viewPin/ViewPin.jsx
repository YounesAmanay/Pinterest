import React from 'react';
import { useParams } from 'react-router-dom';
import './viewPin.css';

import usePins from '../../../../../../costumHooks/usePins';
import useFormattedDate from '../../../../../../costumHooks/useFormattedDate ';
import useImage from '../../../../../../costumHooks/useImage';
import useUserImage from '../../../../../../costumHooks/useUserImage';
import Avatar from '../../../../../fragments/Avatar';

function ViewPin() {
  const { id } = useParams();
  const { pins, isLoading } = usePins(id);
  const pin = pins.length > 0 ? pins[0] : null;
  const { image: pin_img, isLoading: isImageLoading } = useImage(pin?.id || '');
  const { isLoading: userImageLoading, image } = useUserImage(pin?.user_id || '');
  const formattedDate = useFormattedDate(pin?.created_at || '');

  return (
    <div className="pin-container">
      {isImageLoading ? (
        <div className="pin-placeholder" style={{ height: pin?.image_height }}></div>
      ) : (
        <img className='pin-image' src={pin_img} alt="pin" />
      )}
      <div className="pin-overlay">
        <div className="overlay-header">
          <div className="category-list">Default</div>
          <button className="save">Save</button>
        </div>
        <div className="info">
          <p className="title">{pin?.title}</p>
          <div className="info-footer">
            <div className="user">
              {userImageLoading ? (
                <div className="pin-avatar-placeholder">{pin?.user_name.charAt(0)}</div>
              ) : (
                <div className="avatar-img">
                  <img src={image} alt="User profile" />
                </div>
              )}
              <p className="user-name">{pin?.user_name}</p>
            </div>
            <p className="pin-date">{formattedDate}</p>
          </div>
        </div>
        {/* <div className="comments">
          
          {pin?.comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <Avatar user={comment.user} size={32} />
              <p>{comment.text}</p>
            </div>
          ))}
    </div> */}
  </div>
</div>
);
}

export default ViewPin;