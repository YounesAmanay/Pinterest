import React, { forwardRef } from "react";
import { GrFormSearch, MdClear } from "react-icons/all";
import axios from "axios";
import { Link } from "react-router-dom";
import "./searchBox.css";
import Avatar from "../../../../fragments/Avatar";
import Highlighter from "react-highlight-words";
import useSearchPins from "../../../../../costumHooks/useSearchPins";

const SearchBox = forwardRef(
  (
    {
      suggestions,
      searchHistory,
      searchTerm,
      setSearchTerm,
      setQuery,
      setShowBox,
      deleteSearchHistory,
      isDeleted,
    },
    ref
  ) => {
    return (
      <div className="overlay">
        <div ref={ref} className="search-box">
          <ul className="suggestion-list">
            {searchTerm
              ? suggestions.map((suggestion, index) => (
                  <li key={index} className="suggestion-item">
                    {suggestion.type === "user" ? (
                      <Link
                        to={`profile/${suggestion.user.id}`}
                        className="avatar-link"
                      >
                        <Avatar
                          user={suggestion.user}
                          searchTerm={searchTerm}
                        />
                      </Link>
                    ) : suggestion.type === "pin" ? (
                      <div
                        className="pin-suggestion"
                        onClick={() => {
                          setSearchTerm(suggestion.title);
                          setQuery(suggestion.title);
                          setShowBox(false);
                        }}
                      >
                        <GrFormSearch />
                        <Highlighter
                          searchWords={[searchTerm]}
                          textToHighlight={suggestion.title}
                          highlightClassName="highlighted-text"
                        />
                      </div>
                    ) : null}
                  </li>
                ))
              : searchHistory.map((history, index) => (
                  <li key={index} className="search-history-item">
                    <div
                      className="pin-suggestion"
                      onClick={() => {
                        setSearchTerm(history.query);
                        setShowBox(false);
                      }}
                    >
                      <GrFormSearch />
                      {history.query}
                    </div>
                    <button className="delete-icon">
                      <MdClear
                        onClick={() => deleteSearchHistory(history.id)}
                      />
                    </button>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    );
  }
);

export default SearchBox;
