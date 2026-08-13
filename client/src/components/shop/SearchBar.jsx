import { FiSearch, FiX } from 'react-icons/fi'

function SearchBar({ value, onChange }) {
  return (
    <div className="shop-searchbox">
      <span className="shop-search-icon">
        <FiSearch size={20} />
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search books by title, author or category..."
        aria-label="Search books"
      />
      {value && (
        <button
          type="button"
          className="shop-search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  )
}

export default SearchBar
