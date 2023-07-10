import React, { useState } from "react";
import { SlSizeFullscreen, IoResizeOutline } from "react-icons/all";
import Header from "./header/Header";
import Filter from "./filter/Filter";
import Gallery from "./gallery/Gallery";
import "./content.css";
import Onboarding from "../nav/onboarding/Onboarding";

function Content() {
  const [showHeader, setShowHeader] = useState(true);

  const toggleHeader = () => {
    setShowHeader(!showHeader);
  };

  return (
    <>
    <div className="home-container">
      <div className={`header-filter-container ${showHeader ? "" : "hidden"}`}>
        <Header />
        <Filter />
      </div>
      <button className="floating-button" onClick={toggleHeader}>
        {showHeader ? <SlSizeFullscreen /> : <IoResizeOutline />}
      </button>
      <Gallery />
    </div>
    </>
  );
}

export default Content;
