import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEye, FiEyeOff, FiCheckCircle, FiLock, FiMail, FiUser } from 'react-icons/fi'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import { useAuth } from '../../context/AuthContext'

/* ------------------------------------------------------------------ */
/*  PasswordInput — reusable password field with a visibility toggle.  */
/*  Used for both the "Password" and "Confirm Password" fields on the  */
/*  register form. Renders a clear label, a show/hide eye button, and  */
/*  inline helper/error text wired up with aria-describedby so screen  */
/*  readers announce the message.                                      */
/* ------------------------------------------------------------------ */
function PasswordInput({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  show,
  onToggleShow,
  autoComplete,
  placeholder = '••••••••',
  describedBy,
  helper,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[#2F2F2F]">
        {label}
      </label>

      <div className="relative">
        {/* Lock icon on the left for visual consistency with Login */}
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A927F]">
          <FiLock size={17} aria-hidden="true" />
        </span>

        <input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value, event)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? describedBy : undefined}
          className={`w-full rounded-xl border bg-[#FBF9F4] py-3.5 pl-11 pr-12 text-sm text-[#2F2F2F] outline-none transition focus:ring-4 ${
            error
              ? 'border-[#D04545] focus:border-[#D04545] focus:ring-[#D04545]/15'
              : 'border-[#D8D0BA] focus:border-[#6B7A58] focus:ring-[#6B7A58]/15'
          }`}
        />

        {/* Show/hide password toggle */}
        <button
          type="button"
          onClick={onToggleShow}
          aria-label={show ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#9A927F] transition hover:text-[#6B7A58] focus:outline-none focus:ring-2 focus:ring-[#6B7A58]/40"
        >
          {show ? <FiEyeOff size={17} /> : <FiEye size={17} />}
        </button>
      </div>

      {/* Optional helper (e.g. the password strength meter) */}
      {helper && <div className="mt-1.5">{helper}</div>}

      {/* Inline validation message */}
      {error && (
        <p id={describedBy} role="alert" className="mt-1.5 text-xs font-medium text-[#D04545]">
          {error}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PasswordStrengthMeter — simple weak/medium/strong indicator.       */
/*                                                                     */
/*  Scoring (purely client-side):                                      */
/*    +1  length is at least 8 characters                              */
/*    +1  contains both upper and lower case letters                   */
/*    +1  contains a digit                                             */
/*    +1  contains a symbol (any non-alphanumeric character)           */
/*                                                                     */
/*  Total maps to a 3-segment bar: 1 => weak (red), 2 => medium        */
/*  (amber), 3 => strong (green). Renders nothing while the field is   */
/*  empty so the form stays tidy before the user starts typing.        */
/* ------------------------------------------------------------------ */
function getPasswordStrength(password) {
  let score = 0
  if (password.length >= 8) score += 1
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  // Clamp into 1..3 (score can be 0 for a short/plain password).
  return Math.min(3, Math.max(1, score))
}

function PasswordStrengthMeter({ password }) {
  if (!password) return null

  const strength = getPasswordStrength(password)
  const config = {
    1: { label: 'Weak', fill: '#D04545', text: '#B03A2E' },
    2: { label: 'Medium', fill: '#D9A406', text: '#A67C00' },
    3: { label: 'Strong', fill: '#6B8E23', text: '#4A6B1A' },
  }
  const { label, fill, text } = config[strength]

  return (
    <div>
      {/* Three-segment bar — filled segments reflect the current score */}
      <div className="flex gap-1.5" aria-hidden="true">
        {[1, 2, 3].map((segment) => (
          <span
            key={segment}
            className="h-1.5 flex-1 rounded-full transition-colors duration-300"
            style={{ backgroundColor: segment <= strength ? fill : '#E8E0CF' }}
          />
        ))}
      </div>
      <p className="mt-1 text-xs font-semibold" style={{ color: text }}>
        Password strength: {label}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Register — account creation page.                                  */
/*                                                                     */
/*  Client-side only for now: validation is entirely local and the     */
/*  "Create Account" submit simulates a short network delay before     */
/*  calling AuthContext.login() (which persists a mock user in         */
/*  localStorage) and redirecting home.                               */
/* ------------------------------------------------------------------ */
function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  /* Form field state. `newsletter` starts pre-checked per the brief. */
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
    newsletter: true,
  })

  /* Which fields the user has blurred — only show errors after a field
     has been visited so we don't shout "this is required" while the
     user is still filling the form. */
  const [touched, setTouched] = useState({})

  /* Becomes true after the first submit attempt — reveals all errors. */
  const [submittedOnce, setSubmittedOnce] = useState(false)

  /* Show/hide state for the two password fields (independent toggles) */
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  /* Mock submission + success-flow state */
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState('')

  /**
   * validate
   * --------
   * Runs every rule against the current form values and returns an
   * object of `field -> error message`. Empty object means valid.
   * This same function powers both the live submit-button disabled
   * state and the final check inside handleSubmit.
   */
  const validate = (values) => {
    const nextErrors = {}

    if (!values.name.trim()) {
      nextErrors.name = 'Please enter your full name.'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!values.password) {
      nextErrors.password = 'Password is required.'
    } else if (values.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.'
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    if (!values.termsAgreed) {
      nextErrors.termsAgreed = 'You must agree to the Terms & Privacy Policy to continue.'
    }

    return nextErrors
  }

  /* All current validation messages (whether or not they are visible yet). */
  const fieldErrors = validate(form)

  /* The form is only "valid" when every rule passes — this drives the
     disabled state of the submit button so it stays greyed until ready. */
  const isFormValid = Object.keys(fieldErrors).length === 0

  /* Derived, visible error messages. A message is shown only for fields
     the user has blurred, or after they attempted to submit the form —
     but never for untouched fields so the form stays calm while filling. */
  const errors = Object.fromEntries(
    Object.entries(fieldErrors).filter(([name]) => touched[name] || submittedOnce),
  )

  /**
   * handleChange — keeps the single `form` object in sync. Checkboxes
   * report `checked`, text inputs report `value`. Errors are derived
   * from `form` on every render, so they clear automatically once the
   * user corrects the field (no stale error messages).
   */
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  /**
   * handleBlur — marks the field as touched so its validation message
   * (if any) becomes visible as soon as the user leaves the field.
   */
  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  /**
   * handleSubmit
   * ------------
   * Final validation guard (covers the form being submitted while the
   * button was still disabled). On success: simulate a network round-trip,
   * call the mock AuthContext.login() so the Navbar shows the logged-in
   * avatar, render the success state, then redirect home after a pause.
   */
  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(form)
    setSubmittedOnce(true)
    setTouched({ name: true, email: true, password: true, confirmPassword: true, termsAgreed: true })

    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setFormError('')
    const nameParts = form.name.trim().split(/\s+/)
    try {
      // Mock sign-up — stores `{ email, name }` via AuthContext.
      await register({
        username: form.email.trim(),
        email: form.email.trim(),
        password: form.password,
        first_name: nameParts[0],
        last_name: nameParts.slice(1).join(' '),
      })
      setSuccess(true)
      setTimeout(() => navigate('/', { replace: true }), 1400)
    } catch (error) {
      const data = error.response?.data
      setFormError(data?.detail || Object.values(data || {}).flat().join(' ') || 'Unable to create your account. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  /* Shared text-input classes: rounded, light cream bg, olive focus ring */
  const inputClasses = (hasError) =>
    `w-full rounded-xl border bg-[#FBF9F4] py-3.5 pl-11 pr-4 text-sm text-[#2F2F2F] placeholder:text-[#A3A08E] outline-none transition focus:ring-4 ${
      hasError
        ? 'border-[#D04545] focus:border-[#D04545] focus:ring-[#D04545]/15'
        : 'border-[#D8D0BA] focus:border-[#6B7A58] focus:ring-[#6B7A58]/15'
    }`

  return (
    <>
      <Navbar />

      <main>
        {/* ---------- HERO ----------
            Centered editorial hero on the cream background, matching the
            pattern used on the Blog and Contact pages. */}
        <section className="bg-[#F8F5EF] pb-8 pt-20 text-center lg:pt-28">
          <Container>
            {/* Small uppercase olive label, letter-spaced */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]"
            >
              Register
            </motion.p>

            {/* Large Playfair headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#2F2F2F] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Create your OpenBook account
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C5A52] sm:text-lg"
            >
              Join a community of readers — build a wishlist, track orders,
              and discover your next favourite book.
            </motion.p>
          </Container>
        </section>

        {/* ---------- REGISTER CARD ----------
            Narrow, centered card — registration forms read better in a
            single column. White background, 16px radius, soft shadow. */}
        <section className="bg-[#F8F5EF] pb-24 lg:pb-28">
          <Container>
            <div className="mx-auto max-w-[480px]">
              {/* Fade-in + slide-up on page load */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                className="rounded-[16px] bg-white p-6 shadow-xl ring-1 ring-[#E8E0CF] sm:p-10"
              >
                {success ? (
                  /* ----- Success state (brief, before redirect) ----- */
                  <div className="py-10 text-center">
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#EFF4E8] text-[#6B7A58]"
                    >
                      <FiCheckCircle size={30} aria-hidden="true" />
                    </motion.span>
                    <h3 className="text-xl font-bold text-[#2F2F2F]">Account created!</h3>
                    <p className="mt-2 text-sm text-[#5C5A52]">
                      Redirecting you to OpenBook…
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Card heading */}
                    <h2
                      className="text-2xl font-bold text-[#2F2F2F]"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Join our reading community
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#5C5A52]">
                      Create your account in under a minute. No card required —
                      just a love of books.
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
                      {formError && <p role="alert" className="text-sm font-medium text-[#D04545]">{formError}</p>}
                      {/* ----- Full Name ----- */}
                      <div>
                        <label
                          htmlFor="register-name"
                          className="mb-2 block text-sm font-semibold text-[#2F2F2F]"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A927F]">
                            <FiUser size={17} aria-hidden="true" />
                          </span>
                          <input
                            id="register-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Jane Reader"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'register-name-error' : undefined}
                            className={inputClasses(Boolean(errors.name))}
                          />
                        </div>
                        {errors.name && (
                          <p
                            id="register-name-error"
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-[#D04545]"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* ----- Email Address ----- */}
                      <div>
                        <label
                          htmlFor="register-email"
                          className="mb-2 block text-sm font-semibold text-[#2F2F2F]"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A927F]">
                            <FiMail size={17} aria-hidden="true" />
                          </span>
                          <input
                            id="register-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="jane@example.com"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'register-email-error' : undefined}
                            className={inputClasses(Boolean(errors.email))}
                          />
                        </div>
                        {errors.email && (
                          <p
                            id="register-email-error"
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-[#D04545]"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* ----- Password ----- */}
                      <PasswordInput
                        id="register-password"
                        name="password"
                        label="Password"
                        value={form.password}
                        onChange={(value, event) => handleChange(event)}
                        onBlur={handleBlur}
                        error={errors.password}
                        show={showPassword}
                        onToggleShow={() => setShowPassword((prev) => !prev)}
                        autoComplete="new-password"
                        describedBy="register-password-error"
                        helper={<PasswordStrengthMeter password={form.password} />}
                      />

                      {/* ----- Confirm Password ----- */}
                      <PasswordInput
                        id="register-confirm-password"
                        name="confirmPassword"
                        label="Confirm Password"
                        value={form.confirmPassword}
                        onChange={(value, event) => handleChange(event)}
                        onBlur={handleBlur}
                        error={errors.confirmPassword}
                        show={showConfirmPassword}
                        onToggleShow={() => setShowConfirmPassword((prev) => !prev)}
                        autoComplete="new-password"
                        describedBy="register-confirm-password-error"
                      />

                      {/* ----- Terms & Privacy ----- */}
                      <div>
                        <label className="flex cursor-pointer select-none items-start gap-3 text-sm leading-6 text-[#5C5A52]">
                          <input
                            type="checkbox"
                            name="termsAgreed"
                            checked={form.termsAgreed}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={Boolean(errors.termsAgreed)}
                            aria-describedby={
                              errors.termsAgreed ? 'register-terms-error' : undefined
                            }
                            className="mt-1 h-4 w-4 shrink-0 rounded border-[#D8D0BA] accent-[#6B7A58] focus:outline-none focus:ring-2 focus:ring-[#6B7A58]/40"
                          />
                          <span>
                            I agree to the{' '}
                            <Link
                              to="/terms"
                              className="font-semibold text-[#6B7A58] underline-offset-2 transition hover:underline"
                            >
                              Terms
                            </Link>{' '}
                            &{' '}
                            <Link
                              to="/privacy-policy"
                              className="font-semibold text-[#6B7A58] underline-offset-2 transition hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </span>
                        </label>
                        {errors.termsAgreed && (
                          <p
                            id="register-terms-error"
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-[#D04545]"
                          >
                            {errors.termsAgreed}
                          </p>
                        )}
                      </div>

                      {/* ----- Newsletter (optional, pre-checked) ----- */}
                      <label className="flex cursor-pointer select-none items-start gap-3 text-sm leading-6 text-[#5C5A52]">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={form.newsletter}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 shrink-0 rounded border-[#D8D0BA] accent-[#6B7A58] focus:outline-none focus:ring-2 focus:ring-[#6B7A58]/40"
                        />
                        <span>
                          Subscribe me to the newsletter — get weekly reading
                          picks from The Reading List.
                        </span>
                      </label>

                      {/* ----- Submit ----- */}
                      <button
                        type="submit"
                        disabled={!isFormValid || submitting}
                        className="w-full rounded-full bg-[#6B7A58] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#556248] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6B7A58]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#C9C4B6] disabled:text-[#F5F2EA] disabled:shadow-none"
                      >
                        {submitting ? 'Creating your account…' : 'Create Account'}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>

              {/* ----- Below the card ----- */}
              {!success && (
                <p className="mt-8 text-center text-sm text-[#5C5A52]">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-bold text-[#6B7A58] transition hover:text-[#556248]"
                  >
                    Log in
                  </Link>
                </p>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Register
