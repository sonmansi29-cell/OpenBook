import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiLock, FiTruck } from 'react-icons/fi'

import { useCart } from '../../context/CartContext'
import useRequireAuth from '../../hooks/useRequireAuth'

// Shipping rules
const FREE_SHIPPING_THRESHOLD = 999
const SHIPPING_FEE = 49

/**
 * OrderSummary
 * ------------
 * Sticky right-hand card showing computed Subtotal / Shipping / Discount / Total,
 * a promo code input, and a "Proceed to Checkout" CTA. Totals are derived
 * dynamically from cart state (never hardcoded).
 */
function OrderSummary() {
  const { cartItems, totalPrice } = useCart()
  const { requireAuth } = useRequireAuth()

  // Local promo code state
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState('')

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const isEmpty = cartItems.length === 0

  // Shipping: free above threshold, otherwise flat fee when cart has items
  const shipping = isEmpty
    ? 0
    : totalPrice >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE

  // Discount: 10% off a fake promo code
  const discount = appliedPromo ? Math.round(totalPrice * 0.1) : 0

  const grandTotal = totalPrice + shipping - discount

const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase()
    if (!code) {
      setPromoError('Please enter a promo code.')
      setAppliedPromo(null)
      return
    }
    if (code === 'OPENBOOK10') {
      setAppliedPromo(code)
      setPromoError('')
    } else {
      setPromoError('That promo code is not valid.')
      setAppliedPromo(null)
    }
  }

  /**
   * Gated checkout click. The CTA is a <Link to="/checkout">; when the user
   * is logged out we preventDefault (stopping the navigation) and let
   * requireAuth redirect to /login with a pending checkout action. After
   * login the Login page carries them straight to /checkout. When logged in
   * requireAuth returns true and the link's default navigation proceeds.
   */
  const handleCheckoutClick = (event) => {
    if (isEmpty) return
    if (!requireAuth({ type: 'checkout', to: '/checkout' })) {
      event.preventDefault()
    }
  }

  return (
    <aside className="lg:sticky lg:top-28 h-fit rounded-[24px] bg-white p-6 shadow-lg ring-1 ring-[#E8E0CF] sm:p-8">
      {/* Heading */}
      <h3 className="text-xl font-bold text-[#2F2F2F]">Order Summary</h3>

      {/* Line rows */}
      <dl className="mt-6 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-[#5C5A52]">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </dt>
          <dd className="font-semibold text-[#2F2F2F]">₹{totalPrice.toLocaleString('en-IN')}</dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-[#5C5A52]">Estimated Shipping</dt>
          <dd className="font-semibold text-[#2F2F2F]">
            {shipping === 0 ? (
              <span className="text-[#2E8B57]">FREE</span>
            ) : (
              `₹${shipping}`
            )}
          </dd>
        </div>

        {appliedPromo && (
          <div className="flex items-center justify-between">
            <dt className="text-[#5C5A52]">Discount ({appliedPromo})</dt>
            <dd className="font-semibold text-[#2E8B57]">-₹{discount.toLocaleString('en-IN')}</dd>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-dashed border-[#E8E0CF]" />

        <div className="flex items-center justify-between">
          <dt className="text-base font-bold text-[#2F2F2F]">Total</dt>
          <dd className="text-lg font-bold text-[#2F2F2F]">
            ₹{grandTotal.toLocaleString('en-IN')}
          </dd>
        </div>
      </dl>

      {/* Promo code input */}
      <div className="mt-6">
        <label htmlFor="promo-code" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#5C5A52]">
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            id="promo-code"
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter code"
            className="w-full rounded-full border border-[#D8D0BA] bg-[#F8F5EF] px-4 py-2.5 text-sm text-[#2F2F2F] outline-none transition focus:border-[#6B7A58] focus:ring-2 focus:ring-[#6B7A58]/20"
          />
          <button
            type="button"
            onClick={handleApplyPromo}
            className="shrink-0 rounded-full border border-[#6B7A58] px-5 py-2.5 text-sm font-bold text-[#6B7A58] transition-colors duration-300 hover:bg-[#6B7A58] hover:text-white"
          >
            Apply
          </button>
        </div>
        {promoError && <p className="mt-2 text-xs font-medium text-[#D04545]">{promoError}</p>}
        {appliedPromo && (
          <p className="mt-2 text-xs font-medium text-[#2E8B57]">Promo applied successfully!</p>
        )}
      </div>

{/* Checkout button */}
      <Link
        to={isEmpty ? '/cart' : '/checkout'}
        aria-disabled={isEmpty}
        onClick={handleCheckoutClick}
        className={`mt-6 block w-full rounded-full py-3.5 text-center text-sm font-bold transition-all duration-300 ${
          isEmpty
            ? 'pointer-events-none cursor-not-allowed bg-[#D8D0BA] text-[#8B8577]'
            : 'bg-[#6B7A58] text-white hover:-translate-y-0.5 hover:bg-[#556248] hover:shadow-lg'
        }`}
      >
        Proceed to Checkout
      </Link>

      {/* Reassurance lines */}
      <div className="mt-6 space-y-2.5 text-xs text-[#5C5A52]">
        <p className="flex items-center gap-2">
          <FiTruck size={14} className="shrink-0 text-[#6B7A58]" />
          Free shipping on orders over ₹{FREE_SHIPPING_THRESHOLD}
        </p>
        <p className="flex items-center gap-2">
          <FiLock size={14} className="shrink-0 text-[#6B7A58]" />
          100% secure checkout. Your details are encrypted.
        </p>
      </div>
    </aside>
  )
}

export default OrderSummary
