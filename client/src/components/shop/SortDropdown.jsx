function SortDropdown({ value, onChange }) {
  return (
    <div className="shop-sortbar">
      <label htmlFor="sortBy">Sort By</label>
      <select id="sortBy" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="best-selling">Best Selling</option>
        <option value="newest">Newest</option>
        <option value="price-asc">Price Low → High</option>
        <option value="price-desc">Price High → Low</option>
        <option value="rating">Highest Rated</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </select>
    </div>
  )
}

export default SortDropdown
