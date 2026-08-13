import { FiSearch } from 'react-icons/fi'

import ProductCard from './ProductCard'

function SkeletonCard() {
  return (
    <div className="shop-skeleton-card">
      <div className="shop-skeleton shop-skeleton-image" />
      <div className="shop-skeleton-body">
        <div className="shop-skeleton shop-skeleton-line w-24" />
        <div className="shop-skeleton shop-skeleton-line" />
        <div className="shop-skeleton shop-skeleton-line w-40" />
        <div className="shop-skeleton shop-skeleton-line w-32" />
      </div>
    </div>
  )
}

function ProductGrid({
  products,
  loading,
  wishlist = [],
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onResetFilters,
}) {
  if (loading) {
    return (
      <div className="shop-grid" aria-busy="true" aria-label="Loading books">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="shop-card-frame">
            <SkeletonCard />
          </div>
        ))}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="shop-empty">
        <span className="shop-empty-icon">
          <FiSearch size={56} />
        </span>
        <h3>No books found</h3>
        <p>
          We couldn't find any books matching your current filters. Try adjusting your search or
          clearing the filters to see more results.
        </p>
        {onResetFilters && (
          <button type="button" className="shop-empty-reset" onClick={onResetFilters}>
            Clear All Filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="shop-grid">
      {products.map((product) => (
        <div key={product.id} className="shop-card-frame">
          <ProductCard
            product={product}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        </div>
      ))}
    </div>
  )
}

export default ProductGrid
