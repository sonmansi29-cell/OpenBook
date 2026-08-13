import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiEye, FiCheck } from 'react-icons/fi'

import Rating from '../common/Rating'

function ProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) {
  const [added, setAdded] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const outOfStock = product.stock <= 0

  const handleAddToCart = () => {
    if (outOfStock) return
    if (onAddToCart) onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const salesLabel = product.sales
    ? `${product.sales >= 1000 ? `${(product.sales / 1000).toFixed(1)}k` : product.sales} sold`
    : null

  return (
    <article className="shop-product-card">
      <div className="shop-card-image-wrap">
        <Link to={`/book/${product.id}`} aria-label={`View ${product.title}`}>
          <img className="shop-card-image" src={product.image} alt={product.title} />
        </Link>

        {product.badge && (
          <span className="shop-badge-flag">{product.badge}</span>
        )}

        {discount > 0 && !outOfStock && (
          <span className="shop-discount-badge">-{discount}%</span>
        )}

<button
          type="button"
          className={`shop-wishlist ${isWishlisted ? 'is-active' : ''}`}
          onClick={(event) => {
            // Prevent the heart click from bubbling to any card navigation.
            event.stopPropagation()
            if (onToggleWishlist) onToggleWishlist(product.id)
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <FiHeart />
        </button>

        <div className="shop-card-quickview">
          <button
            type="button"
            className="shop-quickview-btn"
            onClick={(event) => {
              // Open the quick view without triggering card navigation.
              event.stopPropagation()
              if (onQuickView) onQuickView(product)
            }}
          >
            <FiEye size={15} />
            Quick View
          </button>
        </div>
      </div>

      <div className="shop-card-body">
        <div className="shop-card-meta">
          <Rating rating={product.rating} showValue />
          {salesLabel && <span className="shop-card-sales">{salesLabel}</span>}
        </div>

        <h3 className="shop-card-title">
          <Link to={`/book/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="shop-card-author">{product.author}</p>
        <p className="shop-card-category">{product.category}</p>

        <div className="shop-card-price-row">
          <span className="shop-price">₹{product.price}</span>
          {product.originalPrice && (
            <span className="shop-original-price">₹{product.originalPrice}</span>
          )}
        </div>

        <span className={`shop-stock-status ${outOfStock ? 'out-of-stock' : 'in-stock'}`}>
          {outOfStock ? '● Out of Stock' : `● In Stock (${product.stock})`}
        </span>

        <div className="shop-card-actions">
          <button
            type="button"
            className="shop-action-link"
            onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
          >
            <FiHeart size={16} />
            {isWishlisted ? 'Saved' : 'Wishlist'}
          </button>
          <button
            type="button"
            className={`shop-action-button ${added ? 'is-added' : ''}`}
            onClick={handleAddToCart}
            disabled={outOfStock}
            aria-disabled={outOfStock}
          >
            {outOfStock ? (
              'Out of Stock'
            ) : added ? (
              <>
                <FiCheck size={16} />
                Added to Cart
              </>
            ) : (
              <>
                <FiShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
