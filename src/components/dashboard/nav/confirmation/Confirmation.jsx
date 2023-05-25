import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/all";
import "./confirmation.css";
import useLogout from "../../../../costumHooks/useLogout";
import { Navigate} from "react-router-dom";

function Confirmation({setShowConfirmation}) {
  const logout = useLogout();
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    logout(); 
    setShowConfirmation(false);
    localStorage.removeItem("token");
    Navigate('/sign-in')
  };

  return (
    <>
      <div className="confirmation-overlay">
        <div className="confirmation-popup">
          <p className="confirmation-message">
            Are you sure you want to log out?
          </p>
          <div className="confirmation-buttons">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="confirm-button" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirmation;
