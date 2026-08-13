import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiInfo } from 'react-icons/fi'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'

/**
 * Login
 * -----
 * Email + password sign-in form with basic client-side validation and a
 * mock sign-in handler (no backend).
 *
 * POST-LOGIN PENDING-ACTION FLOW
 * ------------------------------
 * Protected actions (wishlist / add-to-cart / checkout) redirect logged-out
 * users here via `useRequireAuth`, passing `location.state`:
 *
 *   {
 *     from:          path to return to after login (e.g. "/shop?category=..."),
 *     pendingAction: { type, bookId?, book?, quantity?, to? },
 *     message:       friendly banner text ("Please log in to add to wishlist")
 *   }
 *
 * On success we (1) show the banner for the blocked action, (2) call
 * AuthContext.login(), (3) replay `pendingAction` automatically so the user
 * doesn't have to click the heart/cart button again, and (4) navigate back to
 * `from`. This is the trickiest part of the auth-gating logic, so it lives
 * here in one place rather than being duplicated across every action handler.
 */
function Login() {
  const { login } = useAuth()
  const { addToWishlist } = useWishlist()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Data captured by useRequireAuth when a protected action was blocked.
  const state = location.state || {}
  // `from` may be a string (set by useRequireAuth) or a location object
  // (set by the Profile route guard) — normalise both.
  const from =
    typeof state.from === 'string'
      ? state.from
      : state.from?.pathname || '/'
  const pendingAction = state.pendingAction || null
  const authMessage = state.message || ''

  /**
   * replayPendingAction
   * -------------------
   * Completes the action the user was trying to do before being sent to
   * login. Called once after a successful sign-in so the wishlist/cart
   * update happens automatically — no second click needed.
   */
  const replayPendingAction = () => {
    if (!pendingAction) return

    const { type, bookId, book, quantity, to } = pendingAction

    if (type === 'wishlist' && bookId != null) {
      addToWishlist(bookId)
    } else if (type === 'cart' && book) {
      addToCart(book, quantity || 1)
    }
    // type === 'checkout' needs no data-mutation — we just continue to `to`.
    return to || null
  }

  const validate = () => {
    const nextErrors = {}

    if (!email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!password) {
      nextErrors.password = 'Password is required.'
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    // Mock sign-in — no backend. AuthContext stores the user locally.
    setSubmitting(true)
    setFormError('')
    try {
      await login({ email: email.trim(), password })
      setSuccess(true)

      // Replay the blocked action (add to wishlist/cart) automatically.
      // For a checkout action this returns the destination path (/checkout).
      const checkoutTarget = replayPendingAction()
      // If a pending checkout exists, continue to it; otherwise return the
      // user to wherever they were before login.
      const destination = checkoutTarget || from

      // Small delay so the success state is visible before redirecting.
      setTimeout(() => navigate(destination, { replace: true }), 900)
    } catch (error) {
      setFormError(error.response?.data?.detail || 'Unable to sign in. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (hasError) =>
    `w-full rounded-full border bg-[#FBF9F4] py-3.5 pl-12 pr-12 text-sm text-[#2F2F2F] outline-none transition focus:ring-4 ${
      hasError
        ? 'border-[#D04545] focus:border-[#D04545] focus:ring-[#D04545]/15'
        : 'border-[#E8E0CF] focus:border-[#6B7A58] focus:ring-[#6B7A58]/15'
    }`

  return (
    <>
      <Navbar />
      <main className="bg-[#F8F5EF] py-28">
<Container>
          <SectionHeading subtitle="Login" title="Welcome back" />

          {/* ---------- Feedback banner (only when redirected by a blocked action) ----------
              useRequireAuth passes a `message` in location.state describing which
              protected action (wishlist / cart / checkout) sent the user here. */}
          {!success && authMessage && (
            <div className="mx-auto mb-6 flex max-w-md items-start gap-3 rounded-2xl border border-[#6B7A58]/30 bg-[#EFF4E8] px-4 py-3 text-sm text-[#556248]">
              <FiInfo size={18} className="mt-0.5 shrink-0 text-[#6B7A58]" />
              <span>{authMessage}</span>
            </div>
          )}

          <div className="mx-auto max-w-md">
            <div className="rounded-[24px] bg-white p-8 shadow-lg ring-1 ring-[#E8E0CF]">
              {success ? (
                /* ----- Success message (brief, before redirect) ----- */
                <div className="py-10 text-center">
                  <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600">
                    <FiCheckCircle size={30} />
                  </span>
                  <h3 className="text-xl font-bold text-[#2F2F2F]">Signed in successfully!</h3>
                  <p className="mt-2 text-sm text-[#5C5A52]">Taking you back to OpenBook…</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {formError && <p role="alert" className="mb-4 text-sm font-medium text-[#D04545]">{formError}</p>}
                  {/* ----- Email ----- */}
                  <div className="mb-5">
                    <label
                      htmlFor="login-email"
                      className="mb-2 block text-sm font-semibold text-[#2F2F2F]"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A927F]">
                        <FiMail size={17} />
                      </span>
                      <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className={inputClass(Boolean(errors.email))}
                        aria-invalid={Boolean(errors.email)}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 text-xs font-medium text-[#D04545]">{errors.email}</p>
                    )}
                  </div>

                  {/* ----- Password ----- */}
                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="login-password"
                        className="block text-sm font-semibold text-[#2F2F2F]"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-xs font-semibold text-[#6B7A58] transition hover:text-[#556248]"
                        onClick={() =>
                          alert('Password reset is not wired up yet — this is a mock demo.')
                        }
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A927F]">
                        <FiLock size={17} />
                      </span>
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={inputClass(Boolean(errors.password))}
                        aria-invalid={Boolean(errors.password)}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A927F] transition hover:text-[#6B7A58]"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1.5 text-xs font-medium text-[#D04545]">{errors.password}</p>
                    )}
                  </div>

                  {/* ----- Submit ----- */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-[#6B7A58] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#556248] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? 'Signing in…' : 'Sign In'}
                  </button>
                </form>
              )}

              {/* ----- Divider + register link ----- */}
              {!success && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-[#5C5A52]">
                    Don’t have an account?{' '}
                    <Link
                      to="/register"
                      className="font-bold text-[#6B7A58] transition hover:text-[#556248]"
                    >
                      Create one
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default Login

