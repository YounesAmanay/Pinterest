import { React, useState } from "react";
import { GrFormSearch } from "react-icons/gr";
import { MdClear } from "react-icons/md";
import "./search.css";

function Search({ searchTerm, setSearchTerm, handleSubmit }) {
  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="chat-search-container">
      <form onSubmit={handleSubmit} className="search">
        <button type="submit">
          <GrFormSearch />
        </button>
        <input
          type="text"
          placeholder="filter the chats ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div className="clear">
            <button onClick={handleClear}>
              <MdClear />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Search;
