import './SearchBar.css';

function Search({ searchTerm, onSearch }) {
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
      style={{ position: 'absolute', width: 1, height: 1, padding: 0, border: 'none', clip: 'rect(0 0 0 0)', overflow: 'hidden' }}
      aria-hidden="true"
    />
  );
}

export default Search;
