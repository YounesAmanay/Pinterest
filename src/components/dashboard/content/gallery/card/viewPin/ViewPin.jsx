import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./viewPin.css";

import useFormattedDate from "../../../../../../costumHooks/useFormattedDate ";
import useImage from "../../../../../../costumHooks/useImage";
import useUserImage from "../../../../../../costumHooks/useUserImage";
import Avatar from "../../../../../fragments/Avatar";
import useFetchPin from "../../../../../../costumHooks/useFetchPin";
import { MdFileDownload } from "react-icons/md";
import Commentaires from "./commentaires/Commentaires";
import useFetchComments from "../../../../../../costumHooks/useFetchComments";
import { AiOutlineSend } from "react-icons/ai";
import useStoreComment from "../../../../../../costumHooks/useStoreComment";
import useToggleFollow from "../../../../../../costumHooks/useToggleFollow";
import useCheckFollow from "../../../../../../costumHooks/useCheckFollow";
import { useDispatch, useSelector } from "react-redux";

function ViewPin() {
  const { id } = useParams();
  const { pin, isLoading } = useFetchPin(Number(id));
  const { image: pin_img, isLoading: isImageLoading } = useImage(pin?.id || "");
  const { isLoading: userImageLoading, image } = useUserImage(
    pin?.user_id || ""
  );
  const formattedDate = useFormattedDate(pin?.created_at || "");
  const { comments, error, loading } = useFetchComments(Number(id));
  const { storeComment } = useStoreComment(Number(id));
  const [msg, setMsg] = useState("");
  const { isFollowed, checkFollow } = useCheckFollow();
  const { toggleFollow } = useToggleFollow();
  const authId = useSelector((state) => state.authUser);
  const [isTrue, setIsTrue] = useState(false);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if (pin && pin.user_id) {
      checkFollow(pin.user_id);
    }
    if (pin && authId === pin.user_id) {
      setIsTrue(true);
    }
  }, [pin, authId, isFollowed, check]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pin_img;
    link.download = "pin_image.jpg";
    link.click();
  };

  const handleMsgChange = (event) => {
    setMsg(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    storeComment(msg);
    setMsg("");
  };

  const handleFollow = async () => {
    await toggleFollow(pin.user_id);
    setCheck(!check);
    isFollowed
      ? dispatch({ type: "SET_MESSAGES", message: "Unfollowed!" })
      : dispatch({ type: "SET_MESSAGES", message: "Followed!" });
  };

  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <div className="pin-view-container">
      {pin && (
        <div className="pin-modal-content">
          <div className="pin-right-section">
            {!isImageLoading && (
              <img className="pin-image" src={pin_img} alt="pin" />
            )}
          </div>
          <div className="pin-lift-section">
            <div>
              <div className="pin-lift-header">
                <div className="lift-user">
                  <div className="user">
                    {userImageLoading ? (
                      <div className="lift-pin-avatar-placeholder">
                        {pin.user_name.charAt(0)}
                      </div>
                    ) : (
                      <Link
                        to={`/profile/${pin.user_id}`}
                        className="pin-avatar-img"
                      >
                        <img src={image} alt="User profile" />
                      </Link>
                    )}
                    <p className="pin-user-name">{pin.user_name}</p>
                  </div>
                  <div className="lift-buttons">
                    {!isTrue && (
                      <>
                        <button
                          className="download-button"
                          onClick={handleDownload}
                        >
                          <MdFileDownload />
                        </button>
                        <button
                          onClick={handleFollow}
                          className={`follow ${isFollowed ? "followed" : ""}`}
                        >
                          {isFollowed ? "followed" : "Follow"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="c-c">
                <div className="pin-v-d">
                  <div className="v-title">{pin.title}</div>
                  <div className="v-desc">{pin.decreption}</div>
                </div>

                {comments && (
                  <Commentaires isTrue={isTrue} comments={comments} />
                )}
              </div>
            </div>
            <form className="messages-foote" onSubmit={handleFormSubmit}>
              <input
                type="text"
                value={msg}
                onChange={handleMsgChange}
                placeholder="Type a comment..."
              />
              <button type="submit" className="send">
                <AiOutlineSend />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewPin;
