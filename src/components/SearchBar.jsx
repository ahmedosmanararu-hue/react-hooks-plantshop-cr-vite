import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, onSearch }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search plants"
      value={searchTerm}
      onChange={handleSearchChange}
      className="search-bar"
    />
  );
}

export default SearchBar;