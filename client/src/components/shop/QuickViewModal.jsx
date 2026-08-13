import { useEffect, useRef, useState } from 'react'
import { FiShoppingCart, FiX, FiHeart, FiEye, FiMinus, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import Rating from '../common/Rating'

/**
 * QuickViewModal
 * --------------
 * Lightbox-style product preview shown from the Shop grid. Behaviours:
 *  - Opens with a focused element, traps Tab focus inside the dialog.
 *  - Closes via outside click, the close (×) button, the Escape key,
 *    "View Details" (navigating away) or "Add to Cart".
 *  - On close, focus returns to the element that opened it.
 *  - Exposes proper dialog semantics (role="dialog" + aria-modal).
 */
function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) {
  const [quantity, setQuantity] = useState(1)
  const dialogRef = useRef(null)
  // Remember which button opened the modal so we can restore focus on close.
  const lastFocusedRef = useRef(null)

  useEffect(() => {
    if (product) setQuantity(1)
  }, [product])

  // Capture the opener and focus the dialog when it opens.
  useEffect(() => {
    if (isOpen && product) {
      lastFocusedRef.current = document.activeElement
      // Small delay so the dialog is mounted before focusing it.
      const t = setTimeout(() => dialogRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
  }, [isOpen, product])

  // Escape key closes the modal; also restore focus when it closes.
  useEffect(() => {
    if (!isOpen) {
      lastFocusedRef.current?.focus?.()
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Focus trap: keep Tab within the modal's focusable elements.
  useEffect(() => {
    if (!isOpen) return

    const handleTab = (event) => {
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusables = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const list = Array.from(focusables).filter((el) => !el.disabled)
      if (!list.length) return

      const first = list[0]
      const last = list[list.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen])

  if (!isOpen || !product) return null

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const reviews = product.sales
    ? product.sales.toLocaleString('en-IN')
    : (product.rating * 420).toLocaleString('en-IN')

  const decrease = () => setQuantity((q) => Math.max(1, q - 1))
  const increase = () => setQuantity((q) => q + 1)

  const handleAddToCart = () => {
    onAddToCart && onAddToCart(product, quantity)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        tabIndex={-1}
        className="relative w-full max-w-2xl rounded-[24px] bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-[#F3EFE6] text-[#2F2F2F] transition hover:bg-[#6B7A58] hover:text-white"
          onClick={onClose}
          aria-label="Close quick view"
        >
          <FiX size={18} />
        </button>

        <div className="grid gap-5 md:grid-cols-[200px_1fr]">
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full rounded-2xl object-cover"
            />
            {product.badge && (
              <span className="shop-badge-flag shop-badge-best-seller">{product.badge}</span>
            )}
            {discount > 0 && (
              <span className="shop-discount-badge">-{discount}%</span>
            )}
          </div>

          <div>
            <p className="shop-card-category">{product.category}</p>
            <h3 id="quick-view-title" className="mt-1 text-2xl font-bold text-[#2F2F2F]">
              {product.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-[#6B7A58]">{product.author}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Rating rating={product.rating} showValue />
              <span className="text-xs text-[#9A927F]">({reviews} Reviews)</span>
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#2F2F2F]">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-[#B0A892] line-through">₹{product.originalPrice}</span>
              )}
              {discount > 0 && (
                <span className="shop-qv-discount">{discount}% OFF</span>
              )}
            </div>

            <p className="mt-4 text-sm leading-7 text-[#5C5A52]">{product.description}</p>

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#5C5A52]">
              <span className="rounded-full bg-[#F3EFE6] px-3 py-1">
                Publisher: <strong>{product.publisher}</strong>
              </span>
              <span className="rounded-full bg-[#F3EFE6] px-3 py-1">
                Pages: <strong>{product.pages}</strong>
              </span>
              <span className="rounded-full bg-[#F3EFE6] px-3 py-1">
                Language: <strong>{product.language}</strong>
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-sm font-semibold text-[#5C5A52]">Quantity</span>
              <div className="shop-qv-qty">
                <button
                  type="button"
                  className="shop-qv-qty-btn"
                  onClick={decrease}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={14} />
                </button>
                <span className="shop-qv-qty-value">{quantity}</span>
                <button
                  type="button"
                  className="shop-qv-qty-btn"
                  onClick={increase}
                  aria-label="Increase quantity"
                >
                  <FiPlus size={14} />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#6B7A58] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#556248]"
                onClick={handleAddToCart}
              >
                <FiShoppingCart size={16} />
                Add to Cart
              </button>

              <button
                type="button"
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition ${
                  isWishlisted
                    ? 'border-[#6B7A58] bg-[#6B7A58] text-white'
                    : 'border-[#d8d0ba] bg-white text-[#2F2F2F] hover:bg-[#F3EFE6]'
                }`}
                onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
              >
                <FiHeart size={16} />
                {isWishlisted ? 'In Wishlist' : 'Wishlist'}
              </button>
            </div>

            <Link
              to={`/book/${product.id}`}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d8d0ba] bg-white px-5 py-2.5 text-sm font-semibold text-[#6B7A58] transition hover:bg-[#F3EFE6]"
              onClick={onClose}
            >
              <FiEye size={16} />
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal

