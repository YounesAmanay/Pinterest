import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addPin.css"; // AddPin component styles
import { useDispatch, useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import { TbFileImport } from "react-icons/tb";
import useCreatePin from "../../../../../costumHooks/useCreatePin";
import Loader from "../../../../fragments/Loader";
import usePins from "../../../../../costumHooks/usePins";
import AddBoard from "./addBoard/AddBoard";
import useFetchBoards from "../../../../../costumHooks/useFetchBoards";

function AddPin({ onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const pins = usePins();
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const categories = useSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  const pinsLoad = useSelector((state) => state.pinsLoad);
  const [showAddBoard, setShowAddBoard] = useState(false);
  const [laod, setload] = useState(false);

  const { data } = useFetchBoards(showAddBoard, laod);

  const { loading, createPin } = useCreatePin();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setBoards(data)
  // }, [showAddBoard ,laod]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setSelectedImageFile(file);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBoardChange = (event) => {
    setSelectedBoard(event.target.value);
    if (event.target.value === "add_board") {
      setSelectedBoard("");
      setShowAddBoard(true);
    }
  };

  const handleSubmit = () => {
    const validationErrors = {};

    if (title.trim().length < 5) {
      validationErrors.title = "Title must be at least 5 characters long";
    }

    if (!description.trim()) {
      validationErrors.description = "Description is required";
    }

    setErrors(validationErrors);

    const formData = new FormData();
    formData.append("pin", selectedImageFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_id", selectedCategory);
    formData.append("board_id", selectedBoard);
    console.log(errors)
    if (errors) {
      createPin(formData)
        .then((newPin) => {
          dispatch({ type: "UPLOAD_PIN", data: !pinsLoad });
          dispatch({
            type: "SET_MESSAGES",
            message: "Pin uploaded successfully!",
          });
          onClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        {!loading ? (
          <>
            <div className="right-section">
              <div className="right-header">Share your inspiration</div>
              <div className="right-body">
                <div className="form-group">
                  <input
                    type="text"
                    id="title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title (at least 5 characters)"
                  />
                  {errors.title && (
                    <span className="error">{errors.title}</span>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    id="description-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description"
                  ></textarea>
                  {errors.description && (
                    <span className="error">{errors.description}</span>
                  )}
                </div>

                <div className="form-group">
                  <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <select
                    id="board-select"
                    value={selectedBoard}
                    onChange={handleBoardChange}
                  >
                    {data && data.length > 0 && (
                      <option value="">Select a board</option>
                    )}
                    <option onClick={() => setShowAddBoard(true)}>
                      Add a board
                    </option>
                    {data &&
                      data.map((board) => (
                        <option key={board?.id} value={board?.id}>
                          {board?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="right-bottom">
                <div className="button-group">
                  <button className="submit-button" onClick={handleSubmit}>
                    Upload
                  </button>
                  <button className="cancel-button" onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="lift-section">
              {selectedImage ? (
                <>
                  <img src={selectedImage} alt="Selected" />
                  <div
                    onClick={() => setSelectedImage(null)}
                    className="clear-import"
                  >
                    <TiDelete />
                  </div>
                </>
              ) : (
                <div className="import-overlay">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    placeholder="Select an image"
                  />
                  <label htmlFor="image-upload">
                    <TbFileImport />
                  </label>
                </div>
              )}
            </div>
            {showAddBoard && (
              <AddBoard
                laod={laod}
                setload={setload}
                onClose={() => setShowAddBoard(false)}
              />
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default AddPin;
