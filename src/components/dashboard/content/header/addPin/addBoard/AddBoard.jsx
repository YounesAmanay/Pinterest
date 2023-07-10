import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./addBoard.css";
import useCreateBoard from "../../../../../../costumHooks/useCreateBoard";

const AddBoard = ({ onClose, setload, load }) => {
  const { data, loading, createBoard } = useCreateBoard();
  const [name, setName] = useState("");
  const [secret, setSecret] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSecretChange = (e) => {
    setSecret(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (name.trim() === "") {
      setError("Please enter a name");
      return;
    }
  
    try {
      const newBoard = await createBoard(name, secret);
      setload(!load)
      onClose();
    } catch (error) {
      // Handle any errors during board creation
      console.error("Error creating board:", error);
    }
  
    setName("");
    setSecret(false);
    setError("");
  };
  

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="b-modal">
      <div className="b-modal-content">
        <div className="b-close-icon" onClick={handleCancel}>
          <FaTimes />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            className="b-input"
          />
          <div className="b-check">
            <label htmlFor="secret">Secret</label>
            <input
              type="checkbox"
              id="secret"
              checked={secret}
              onChange={handleSecretChange}
              className="b-checkbox"
            />
          </div>
          <div className="b-error">{error}</div>
          <div className="b-button-group">
            <button type="submit" className="b-button b-create-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBoard;
