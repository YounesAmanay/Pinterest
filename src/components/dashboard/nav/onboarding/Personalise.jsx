import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './personalise.css';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import useStoreCategories from '../../../../costumHooks/useStoreCategories';

function Personalise({onclose}) {
  const categories = useSelector((state) => state.categories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [handleClick] = useStoreCategories();
  const handleCategorySelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const isCategorySelected = (categoryId) => {
    return selectedCategories.includes(categoryId);
  };

  const handlePersonalise =()=>{
    handleClick(selectedCategories)
    console.log(selectedCategories  )
    onclose()
  }

  const canFinishPersonalise = selectedCategories.length >= 3;

  return (
    <div className="-p-personalise-container">
      <h2 className="-p-personalise-title">Select Categories</h2>
      <div className="-p-category-container">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`-p-category-item ${isCategorySelected(category.id) ? 'selected' : ''}`}
            onClick={() => handleCategorySelect(category.id)}
          >
            <span>{category.category}</span>
            {isCategorySelected(category.id) && <IoCheckmarkDoneCircleOutline />}
          </div>
        ))}
      </div>
      {canFinishPersonalise && (
        <button
          className="-p-finish-button"
          onClick={ handlePersonalise}
        >
          Personalise
        </button>
      )}
    </div>
  );
}

export default Personalise;
