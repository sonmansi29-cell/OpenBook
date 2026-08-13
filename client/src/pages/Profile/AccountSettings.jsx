import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiLock, FiEye, FiEyeOff, FiAlertTriangle, FiCheck } from 'react-icons/fi'

import { useAuth } from '../../context/AuthContext'

/**
 * PasswordInput
 * -------------
 * Mirrors the password field used on Register/Login (rounded input, lock
 * icon on the left, show/hide eye toggle on the right, inline error text).
 * It lives here rather than a shared file because Register defines its own
 * copy inline too — keeping the pattern consistent without touching other
 * pages.
 */
function PasswordInput({ id, label, value, onChange, show, onToggleShow, autoComplete, error }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[#2F2F2F]">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A927F]">
          <FiLock size={17} aria-hidden="true" />
        </span>
        <input
          id={id}
          type={show ? 'text' : 'password'}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-[#FBF9F4] py-3.5 pl-11 pr-12 text-sm text-[#2F2F2F] outline-none transition focus:ring-4 ${
            error
              ? 'border-[#D04545] focus:border-[#D04545] focus:ring-[#D04545]/15'
              : 'border-[#D8D0BA] focus:border-[#6B7A58] focus:ring-[#6B7A58]/15'
          }`}
        />
        <button
          type="button"
          onClick={onToggleShow}
          aria-label={show ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#9A927F] transition hover:text-[#6B7A58] focus:outline-none focus:ring-2 focus:ring-[#6B7A58]/40"
        >
          {show ? <FiEyeOff size={17} aria-hidden="true" /> : <FiEye size={17} aria-hidden="true" />}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-[#D04545]">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Toggle
 * ------
 * Small accessible switch (role="switch") used for the notification
 * preferences. Styled as a pill that slides a white knob between the olive
 * track and a muted off-track.
 */
function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-semibold text-[#2F2F2F]">{label}</p>
        {description && <p className="mt-0.5 text-xs text-[#9A927F]">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58] ${
          checked ? 'bg-[#6B7A58]' : 'bg-[#D8D0BA]'
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  )
}

/**
 * AccountSettings
 * ---------------
 * 1. Change Password — three fields (current / new / confirm) using the
 *    PasswordInput pattern with show-hide toggles and validation.
 * 2. Notification preferences — three toggle switches, local state only.
 * 3. Delete Account danger zone — muted red text that opens a confirmation
 *    modal (AnimatePresence overlay). Confirming calls AuthContext.logout()
 *    (so the Navbar reverts to its "Login" button) then redirects home.
 */
function AccountSettings() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  })
  const [show, setShow] = useState({ current: false, new: false, confirm: false })
  const [passwordErrors, setPasswordErrors] = useState({})
  const [passwordSaved, setPasswordSaved] = useState(false)

  const [prefs, setPrefs] = useState({
    orders: true,
    newsletter: true,
    arrivals: false,
  })

  const [confirmOpen, setConfirmOpen] = useState(false)

  const handlePasswordChange = (field) => (value) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }))
    setPasswordErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const toggleShow = (field) => () => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handlePasswordSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!passwordForm.current) nextErrors.current = 'Please enter your current password.'
    if (passwordForm.new.length < 8)
      nextErrors.new = 'New password must be at least 8 characters.'
    if (passwordForm.confirm !== passwordForm.new)
      nextErrors.confirm = 'Passwords do not match.'

    setPasswordErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Mock success — no backend to persist the change yet.
    setPasswordSaved(true)
    setPasswordForm({ current: '', new: '', confirm: '' })
    setTimeout(() => setPasswordSaved(false), 2200)
  }

  const handleDeleteAccount = () => {
    setConfirmOpen(false)
    // Mock deletion: no backend, so we clear auth state and head home.
    logout()
    navigate('/', { replace: true })
  }

  const togglePref = (key) => (value) => {
    setPrefs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* ----- Change password ----- */}
      <section className="rounded-2xl border border-[#E8E0CF] bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#2F2F2F]">Change Password</h3>
        <p className="mt-1 text-sm text-[#5C5A52]">
          Use at least 8 characters. Pick something only you would know.
        </p>

        <form onSubmit={handlePasswordSubmit} noValidate className="mt-6 space-y-5">
          <PasswordInput
            id="settings-current-password"
            label="Current Password"
            value={passwordForm.current}
            onChange={handlePasswordChange('current')}
            show={show.current}
            onToggleShow={toggleShow('current')}
            autoComplete="current-password"
            error={passwordErrors.current}
          />
          <PasswordInput
            id="settings-new-password"
            label="New Password"
            value={passwordForm.new}
            onChange={handlePasswordChange('new')}
            show={show.new}
            onToggleShow={toggleShow('new')}
            autoComplete="new-password"
            error={passwordErrors.new}
          />
          <PasswordInput
            id="settings-confirm-password"
            label="Confirm New Password"
            value={passwordForm.confirm}
            onChange={handlePasswordChange('confirm')}
            show={show.confirm}
            onToggleShow={toggleShow('confirm')}
            autoComplete="new-password"
            error={passwordErrors.confirm}
          />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-[#6B7A58] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#556248] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58]"
            >
              Update Password
            </button>
            {passwordSaved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2E7D32]">
                <FiCheck size={16} aria-hidden="true" />
                Password updated
              </span>
            )}
          </div>
        </form>
      </section>

      {/* ----- Notification preferences ----- */}
      <section className="rounded-2xl border border-[#E8E0CF] bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#2F2F2F]">Notifications</h3>
        <p className="mt-1 text-sm text-[#5C5A52]">
          Choose which emails you want to receive from OpenBook.
        </p>

        <div className="mt-4 divide-y divide-[#F0EAE0]">
          <Toggle
            label="Order updates"
            description="Shipping confirmations and delivery status"
            checked={prefs.orders}
            onChange={togglePref('orders')}
          />
          <Toggle
            label="Newsletter"
            description="Weekly reading picks from The Reading List"
            checked={prefs.newsletter}
            onChange={togglePref('newsletter')}
          />
          <Toggle
            label="New arrivals alerts"
            description="Be the first to know about freshly stocked books"
            checked={prefs.arrivals}
            onChange={togglePref('arrivals')}
          />
        </div>
      </section>

      {/* ----- Danger zone ----- */}
      <section className="rounded-2xl border border-[#D04545]/25 bg-[#FDF6F4] p-6">
        <h3 className="text-lg font-bold text-[#D04545]">Delete Account</h3>
        <p className="mt-1 text-sm text-[#5C5A52]">
          Permanently remove your account, orders, and saved addresses. This
          action cannot be undone.
        </p>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="mt-4 rounded-full border border-[#D04545] px-6 py-2.5 text-sm font-bold text-[#D04545] transition hover:bg-[#D04545] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D04545]"
        >
          Delete Account
        </button>
      </section>

      {/* ----- Confirmation modal ----- */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-[#1A1A1A]/50 p-4 backdrop-blur-sm"
            onClick={() => setConfirmOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl"
            >
              <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#D04545]/10 text-[#D04545]">
                <FiAlertTriangle size={26} aria-hidden="true" />
              </span>
              <h3 id="delete-account-title" className="text-xl font-bold text-[#2F2F2F]">
                Delete your account?
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5C5A52]">
                This will permanently remove your account, order history and
                saved addresses. You will not be able to undo this action.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  className="rounded-full border border-[#D8D0BA] bg-white py-3 text-sm font-bold text-[#2F2F2F] transition hover:bg-[#F8F5EF]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="rounded-full bg-[#D04545] py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#B03A2E]"
                >
                  Yes, delete it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccountSettings

