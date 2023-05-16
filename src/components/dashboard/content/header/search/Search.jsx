import React, { useState, useEffect, useRef } from "react";
import { GrFormSearch, MdClear } from "react-icons/all";
import axios from "axios";
import "./search.css";
import SearchBox from "./SearchBox";
import _ from "lodash";
import useOutsideClick from "../../../../../costumHooks/useOutsideClick";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [loading, setLoading] = useState(false);


  const ref = useRef(null);

  useOutsideClick(ref, () => {
    if (showBox) setShowBox(false);
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (searchTerm.trim()) {
      setLoading(true);

      const debounceTimeout = setTimeout(() => {
        axios
          .post(
            "http://localhost:8000/api/search/suggestions",
            {
              q: searchTerm,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setSuggestions(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 500);

      return () => clearTimeout(debounceTimeout);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/search/history", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setSearchHistory(response.data.history);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClear = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowBox(false); // Hide the box
  };

  return (
    <div className="search-container">
      <div className="search">
        <form>
          <button type="submit">
            <GrFormSearch />
          </button>
        </form>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setShowBox(true)} // Show the box when clicking on the input
          placeholder="Search for pins"
        />
        {searchTerm && (
          <div className="clear">
            <button onClick={handleClear}>
              <MdClear />
            </button>
          </div>
        )}
      </div>
      {showBox ? (
        <SearchBox
          ref={ref}
          searchHistory={searchHistory}
          setSearchHistory={setSearchHistory}
          suggestions={suggestions}
          searchTerm={searchTerm}
          loading={loading}
        />
      ) : null}
    </div>
  );
}

export default Search;
