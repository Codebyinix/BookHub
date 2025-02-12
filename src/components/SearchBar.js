import React, { useState, useEffect, useRef } from 'react';
import { index } from '../config/algolia';
import debounce from 'lodash/debounce';
import { FaTimes } from 'react-icons/fa'; // Import the clear icon

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const debouncedSearch = debounce(async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const { hits } = await index.search(query, {
        hitsPerPage: 5,
        attributesToRetrieve: ['title', 'author'],
      });
      setSuggestions(hits);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    }
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
    debouncedSearch(value);
  };

  const handleSuggestionClick = (book) => {
    setSearchTerm(book.title);
    setShowSuggestions(false);
    onSearch([book]);
  };

  // New function to clear search and return to home
  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch([]); // This will trigger showing all books again
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
        />
        {searchTerm && (
          <button 
            className="clear-search"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((book, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(book)}
            >
              <div className="suggestion-title">{book.title}</div>
              <div className="suggestion-author">by {book.author}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;