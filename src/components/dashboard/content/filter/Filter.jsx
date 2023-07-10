import React, { useState, useEffect, useRef } from "react";
import "./filter.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/all";
import usePinsByCategory from "../../../../costumHooks/usePinsByCategory";
import { useDispatch, useSelector } from "react-redux";

function Filter() {
  const scrollContainer = useRef(null);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const { pins } = usePinsByCategory(selectedCategory?.id);



  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 500;
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 500;
    }
  };
  const handleCategoryClick = (category) => {
    if (selectedCategory && selectedCategory.id === category.id) {
      dispatch({ type: "SELECT_CATEGORY", selectedCategory: null });
      dispatch({type:'SEARCH',search:false}) 
    } else {
      dispatch({ type: "SELECT_CATEGORY", selectedCategory: category });
      dispatch({type:'SEARCH',search:false}) 
      const categoryButton = document.getElementById(`category-${category.id}`);
      if (categoryButton) {
        const containerWidth = scrollContainer.current.offsetWidth;
        const scrollOffset =
          categoryButton.offsetLeft -
          containerWidth / 2 +
          categoryButton.offsetWidth / 2;
        scrollContainer.current.scrollLeft = scrollOffset;
      }
    }
  };
  
  return (
    <div className="filter">
      <button className="scroll-button left" onClick={scrollLeft}>
        <BsChevronLeft />
      </button>
      <div className="category-container" ref={scrollContainer}>
        {categories &&
          categories.map((category) => {
            return (
              <button
                id={`category-${category.id}`}
                className={`category ${
                  selectedCategory && selectedCategory.id === category.id
                    ? "active"
                    : ""
                }`}
                key={category.id}
                onClick={() => handleCategoryClick(category)}
              >
                {category.category}
              </button>
            );
          })}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>
        <BsChevronRight />
      </button>
    </div>
  );
}

export default Filter;
