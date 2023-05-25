import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserImage from "../../../costumHooks/useUserImage";
import { BsChatDots } from "react-icons/bs";
import { MdUpdate } from "react-icons/md";
import "./profile.css";
import useUser from "../../../costumHooks/useUser";
import { useSelector } from "react-redux";
import Loader from "../../fragments/Loader";
import useUpdateProfile from "../../../costumHooks/useUpdateProfile";
import useCreateChat from "../../../costumHooks/useCreateChat";

function Profile() {
  const { id } = useParams();
  const authId = useSelector((state) => state.authUser);
  const { user, isLoading } = useUser(id);
  const [selectedImage, setSelectedImage] = useState(null);
  const { image } = useUserImage(id ,selectedImage);
  const { updateProfile } = useUpdateProfile();
  const { createChat } = useCreateChat();
  const navigate = useNavigate();
  const isTrue = authId === Number(id) ;
  const handleClick = async () => {
    await createChat(Number(id));
    navigate('/chat');
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    await updateProfile(file);
  };
  
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="profile-container">
      <div className="user-info">
        <div className="user-avatar">
          {isTrue&&<div className="user-avatar-overlay">
            <label htmlFor="image-upload" className="upload-label">
              <MdUpdate />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          }
          {selectedImage ? (
            <img src={selectedImage} className="avatar-image" alt="User Avatar" />
          ) : image ? (
            <img src={image} className="avatar-image" alt="User Avatar" />
          ) : (
            <div className="avatar-placeholder">{user.name.charAt(0)}</div>
          )}
        </div>
        <div className="user-actions">
          <p>{user.name}</p>
          {isTrue? (
            ""
          ) : (
            <button className="start-chat" onClick={handleClick}>
              <BsChatDots />
            </button>
          )}
        </div>
      </div>
      <div className="user-gallery">
        <div className="cover-container"></div>
      </div>
    </div>
  );
}

export default Profile;
