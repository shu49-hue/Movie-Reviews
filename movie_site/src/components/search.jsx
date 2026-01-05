import './search.css';

const Search = ({ showSearch, setShowSearch }) => {
  return (
    <div className="search-bar">
      <img
        src="/search.svg"
        alt="Search"
        className="search-icon"
      />

      <input
        type="text"
        placeholder="Search 1000+ movies..."
        value={showSearch}
        onChange={(e) => setShowSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
