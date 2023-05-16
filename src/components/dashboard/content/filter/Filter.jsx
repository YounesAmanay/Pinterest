import React, { useState, useEffect, useRef } from "react";
import "./filter.css";
import axios from "axios";
import useCategories from "../../../../costumHooks/useCategories";
import { BsChevronLeft, BsChevronRight } from "react-icons/all";

function Filter() {
  const categories = useCategories();
  const scrollContainer = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 200;
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const categoryButton = document.getElementById(`category-${category.id}`);
    if (categoryButton) {
      const containerWidth = scrollContainer.current.offsetWidth;
      const scrollOffset = categoryButton.offsetLeft - containerWidth / 2 + categoryButton.offsetWidth / 2;
      scrollContainer.current.scrollLeft = scrollOffset;
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
                className={`category ${selectedCategory === category ? "active" : ""}`}
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
