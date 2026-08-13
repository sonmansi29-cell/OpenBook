import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2, FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'

import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

/**
 * CartItemRow
 * -----------
 * A single line item in the cart: thumbnail, title/author, format, quantity
 * stepper (pill-shaped, olive outline), unit + line pricing, remove button,
 * and a "Move to Wishlist" link. Uses framer-motion for a smooth slide-up on
 * load and a height/opacity transition when the item is removed.
 */
function CartItemRow({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  const { addToWishlist, isWishlisted } = useWishlist()

  const lineTotal = item.price * item.quantity

  /**
   * Decrease quantity (min 1). If at 1, the minus button is disabled so the
   * user must use the trash icon to remove the item entirely.
   */
  const decrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    }
  }

  const increase = () => updateQuantity(item.id, item.quantity + 1)

  /** Move the item from the cart to the wishlist (and remove from cart). */
  const moveToWishlist = () => {
    if (!isWishlisted(item.id)) {
      addToWishlist(item.id)
    }
    removeFromCart(item.id)
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative flex flex-col gap-4 border-b border-[#E8E0CF] py-6 last:border-b-0"
    >
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Book cover thumbnail */}
        <Link
          to={`/book/${item.id}`}
          className="h-24 w-16 shrink-0 overflow-hidden rounded-lg shadow-sm ring-1 ring-[#E8E0CF] sm:h-32 sm:w-24 sm:rounded-xl"
          aria-label={`View ${item.title}`}
        >
          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
        </Link>

        {/* Title / author / format / move-to-wishlist */}
        <div className="min-w-0 flex-1 pr-8">
          <Link
            to={`/book/${item.id}`}
            className="line-clamp-2 text-sm font-bold text-[#2F2F2F] transition-colors hover:text-[#6B7A58] sm:text-base"
          >
            {item.title}
          </Link>
          <p className="mt-1 text-xs text-[#5C5A52]">{item.author}</p>

          <span className="mt-2 inline-block rounded-full bg-[#F8F5EF] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#6B7A58] ring-1 ring-[#E8E0CF]">
            Paperback
          </span>

          <button
            type="button"
            onClick={moveToWishlist}
            className="mt-3 hidden items-center gap-1.5 text-xs font-semibold text-[#5C5A52] transition-colors hover:text-[#6B7A58] sm:inline-flex"
          >
            <FiHeart size={13} />
            Move to Wishlist
          </button>
        </div>

        {/* Remove button (top-right) */}
        <button
          type="button"
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.title} from cart`}
          className="absolute right-0 top-6 text-[#9A927F] transition-all duration-300 hover:scale-110 hover:text-[#D04545]"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      {/* Mobile-only move-to-wishlist link */}
      <button
        type="button"
        onClick={moveToWishlist}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C5A52] transition-colors hover:text-[#6B7A58] sm:hidden"
      >
        <FiHeart size={13} />
        Move to Wishlist
      </button>

      {/* Quantity stepper + pricing */}
      <div className="flex items-center justify-between pr-0 sm:ml-[120px] sm:pr-0">
        <div className="flex items-center rounded-full border border-[#6B7A58] p-1">
          <button
            type="button"
            onClick={decrease}
            disabled={item.quantity <= 1}
            aria-label={`Decrease quantity of ${item.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B7A58] transition-colors hover:bg-[#6B7A58] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#6B7A58]"
          >
            <FiMinus size={14} />
          </button>
          <span className="w-9 text-center text-sm font-bold text-[#2F2F2F]" aria-live="polite">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={increase}
            aria-label={`Increase quantity of ${item.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B7A58] transition-colors hover:bg-[#6B7A58] hover:text-white"
          >
            <FiPlus size={14} />
          </button>
        </div>

        {/* Unit + line price */}
        <div className="text-right">
          <p className="text-xs text-[#5C5A52]">₹{item.price} each</p>
          <p className="text-base font-bold text-[#2F2F2F]">
            ₹{lineTotal.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </motion.li>
  )
}

export default CartItemRow
