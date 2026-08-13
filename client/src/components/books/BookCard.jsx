import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaCheck } from 'react-icons/fa'
import Rating from './Rating'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import useRequireAuth from '../../hooks/useRequireAuth'

/**
 * BookCard
 * ---------
 * Homepage card used by both the "Books Everyone Loves This Week"
 * (WeeklyReads) and BestSellers sections.
 *
 * WHAT WAS BROKEN:
 *   The heart (wishlist) button and "Add to Cart" button were plain <button>
 *   elements with NO onClick handlers, and this component did NOT import
 *   CartContext, WishlistContext, or useRequireAuth at all. As a result,
 *   clicking either button did nothing.
 *
 * WHAT WAS CHANGED:
 *   - Wired the heart button to the SAME WishlistContext used on the Shop
 *     page (toggleWishlist + isWishlisted), so wishlist state stays
 *     consistent across the Home and Shop pages (same book.id from books.js).
 *   - Wired "Add to Cart" to the SAME CartContext used on the Shop page
 *     (addToCart), with a brief inline "Added ✓" confirmation.
 *   - Both actions are gated behind the SAME useRequireAuth() hook used on
 *     the Shop page, so logged-out users are redirected to /login with the
 *     pending action replayed after login.
 *   - The visual design / markup is unchanged.
 */
function BookCard({ book }) {
  // Reuse the same contexts that power the Shop page + navbar badges, so the
  // wishlist/cart counters update immediately when a card is interacted with.
  const { wishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { requireAuth } = useRequireAuth()

  // Local "added to cart ✓" confirmation feedback (mirrors Shop ProductCard).
  const [added, setAdded] = useState(false)

  const isWishlisted = wishlist.includes(book.id)

  // Gated wishlist toggle — identical behaviour to the Shop page.
  const handleToggleWishlist = () => {
    if (!requireAuth({ type: 'wishlist', bookId: book.id })) return
    toggleWishlist(book.id)
  }

  // Gated add-to-cart — identical behaviour to the Shop page, with a short
  // inline confirmation so the user gets feedback.
  const handleAddToCart = () => {
    if (!requireAuth({ type: 'cart', book, quantity: 1 })) return
    addToCart(book, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5 }}
      className="group rounded-[24px] bg-white p-4 shadow-lg ring-1 ring-[#E8E0CF] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden rounded-[18px]">
        <div className="aspect-[2/3] overflow-hidden rounded-[18px]">
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B7A58]">
          {book.badge}
        </div>

<button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute right-3 top-3 rounded-full p-2 transition duration-300 hover:bg-white group-hover:scale-110 ${
            isWishlisted ? 'bg-[#6B7A58] text-white' : 'bg-white/90 text-[#6B7A58]'
          }`}
        >
          <FaHeart className="text-sm" />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="text-xs font-semibold text-[#F0E6D4]">{book.author}</p>
          <h3 className="mt-1 text-lg font-bold">{book.title}</h3>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold">₹{book.price}</span>
            <span className="text-xs text-gray-200">{book.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <p className="text-sm font-semibold text-[#2F2F2F]">{book.title}</p>
          <p className="text-xs text-[#6B7A58]">{book.author}</p>
        </div>

        <Rating rating={book.rating} />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#2F2F2F]">₹{book.price}</span>
            {book.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{book.originalPrice}
              </span>
            )}
          </div>

<button
            type="button"
            onClick={handleAddToCart}
            className={`rounded-full px-4 py-2 text-xs font-semibold text-white transition duration-300 ${
              added ? 'bg-[#3E8E5A]' : 'bg-[#6B7A58] hover:bg-[#556248]'
            }`}
          >
            {added ? (
              <>
                <FaCheck className="mr-1 inline" />
                Added
              </>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default BookCard
