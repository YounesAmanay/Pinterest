import React, { forwardRef } from "react";
import { GrFormSearch, MdClear } from "react-icons/all";
import axios from "axios";
import { Link } from "react-router-dom";
import "./searchBox.css";
import Avatar from "../../../../fragments/Avatar";
import Highlighter from "react-highlight-words";

const SearchBox = forwardRef(
  (
    {
      suggestions,
      setSearchHistory,
      searchHistory,
      searchTerm,
    },
    ref
  ) => {
    return (
      <div className="overlay">
        <div ref={ref} className="search-box">
          <ul className="suggestion-list">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <li key={index} className="suggestion-item">
                  {suggestion.type === "user" ? (
                    <Link
                      to={`profile/${suggestion.user.id}`}
                      className="avatar-link"
                    >
                      <Avatar user={suggestion.user} searchTerm={searchTerm} />
                    </Link>
                  ) : suggestion.type === "pin" ? (
                    <div className="pin-suggestion">
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
            ) : (
              <>
                {searchHistory.length > 0 ? (
                  searchHistory.map((history, index) => (
                    <li key={index} className="search-history-item">
                      {history.query}
                      <MdClear
                        className="delete-icon"
                        onClick={() => onDeleteSearchHistory(history.id)}
                      />
                    </li>
                  ))
                ) : (
                    <div>

                    </div>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    );
  }
);

export default SearchBox;
