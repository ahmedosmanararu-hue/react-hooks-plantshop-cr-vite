function SearchBar({ searchTerm, onSearch }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Type a name to search..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="search-bar"
    />
  );
}

export default SearchBar;