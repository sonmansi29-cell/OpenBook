function FilterSidebar({
  categories,
  selectedCategories,
  onToggleCategory,
  priceRanges,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  inStockOnly,
  onInStockChange,
  onClear,
}) {
  return (
    <aside className="shop-sidebar">
      <div className="shop-sidebar-head">
        <h3>Filters</h3>
        <button type="button" className="shop-sidebar-reset" onClick={onClear}>
          Reset
        </button>
      </div>

      <div className="shop-sidebar-section">
        <h3 className="shop-sidebar-title">Categories</h3>
        <div className="shop-filter-list">
          {categories.map((category) => (
            <label key={category.name} className="shop-filter-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => onToggleCategory(category.name)}
              />
              <span className="shop-filter-name">{category.name}</span>
              <span className="shop-filter-count">{category.count}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="shop-sidebar-section">
        <h3 className="shop-sidebar-title">Price</h3>
        <div className="shop-filter-list">
          {priceRanges.map((range) => (
            <label key={range.id} className="shop-filter-item">
              <input
                type="radio"
                name="priceRange"
                checked={priceRange === range.id}
                onChange={() => onPriceRangeChange(range.id)}
              />
              <span className="shop-filter-name">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="shop-sidebar-section">
        <h3 className="shop-sidebar-title">Rating</h3>
        <div className="shop-filter-list">
          {[4.5, 4, 3.5, 3].map((rating) => (
            <label key={rating} className="shop-filter-item">
              <input
                type="radio"
                name="minRating"
                checked={minRating === rating}
                onChange={() => onMinRatingChange(rating)}
              />
              <span className="shop-filter-name shop-filter-stars">
                {'★'.repeat(Math.round(rating))}
                <span className="opacity-40">{'★'.repeat(5 - Math.round(rating))}</span>
              </span>
            </label>
          ))}
          <label className="shop-filter-item">
            <input
              type="radio"
              name="minRating"
              checked={minRating === 0}
              onChange={() => onMinRatingChange(0)}
            />
            <span className="shop-filter-name">Any Rating</span>
          </label>
        </div>
      </div>

      <div className="shop-sidebar-section">
        <h3 className="shop-sidebar-title">Availability</h3>
        <div className="shop-filter-list">
          <label className="shop-filter-item">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => onInStockChange(event.target.checked)}
            />
            <span className="shop-filter-name">In Stock Only</span>
          </label>
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar
