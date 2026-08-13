import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Per-action friendly messages shown on the Login page when a logged-out
 * user is redirected because they triggered a protected action. The message
 * reflects *which* action was blocked so the redirect doesn't feel random.
 */
const MESSAGES = {
  wishlist: 'Please log in to add books to your wishlist.',
  cart: 'Please log in to add items to your cart.',
  checkout: 'Log in to continue to checkout.',
}

/**
 * useRequireAuth
 * --------------
 * Single, reusable auth gate for protected actions (wishlist / add-to-cart /
 * checkout). It reads the authenticated state from AuthContext — the same
 * single source of truth that powers the navbar — i.e. it never performs its
 * own separate auth check.
 *
 * Usage:
 *   const { requireAuth } = useRequireAuth()
 *
 *   if (!requireAuth({ type: 'wishlist', bookId: book.id })) return
 *   toggleWishlist(book.id)          // only reached when logged in
 *
 * When the user is logged in it returns `true` and the caller proceeds with
 * the action exactly as before (no behaviour change for signed-in users).
 *
 * When the user is NOT logged in it returns `false` and redirects to /login,
 * recording the intended action + the current page in React Router's
 * `location.state`:
 *
 *   navigate('/login', {
 *     state: {
 *       from:        current path (+ query string) to return to after login
 *       pendingAction: { type, bookId, book, quantity, to } — the thing the
 *                      user wanted to do, replayed automatically after login
 *       message:     friendly banner text for the Login page
 *     },
 *   })
 *
 * The Login page reads this state, completes `pendingAction` on success, and
 * returns the user to `from` — so they never have to click the heart/cart
 * button a second time.
 */
export default function useRequireAuth() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  /**
   * attempt / redirection gate.
   *
   * @param {object|string} pendingAction
   *   Either a string type ('wishlist' | 'cart' | 'checkout') or an object:
   *     { type, bookId, book, quantity, to }
   *     - wishlist: { type:'wishlist', bookId }
   *     - cart:     { type:'cart', book, quantity }
   *     - checkout: { type:'checkout', to }
   */
  const requireAuth = (pendingAction) => {
    // Already signed in — allow the action to proceed immediately.
    if (isAuthenticated) return true

    const action =
      typeof pendingAction === 'string' ? { type: pendingAction } : pendingAction

    const type = action?.type || 'checkout'

    // Where the user is now (path + query) so we can return them here after
    // they log in. Using the full search string preserves filters/sorts/page.
    const from = location.pathname + location.search

    // Friendly message matching the blocked action.
    const message = MESSAGES[type] || MESSAGES.checkout

    // Redirect to login, remembering the pending action + return path.
    navigate('/login', {
      state: { from, pendingAction: action, message },
    })

    // Signal to the caller that the action was NOT performed (must stop).
    return false
  }

  return { requireAuth }
}
