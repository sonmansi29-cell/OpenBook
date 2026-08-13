import { useState } from 'react'
import { FiPackage, FiHeart, FiCalendar, FiCheck } from 'react-icons/fi'

import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import { mockOrders, MEMBER_SINCE } from './profileData'
import StatBlock from './StatBlock'

/**
 * AccountOverview
 * ---------------
 * Default tab. An editable Full Name / Email / Phone form pre-filled from
 * AuthContext (the same source that powers the navbar avatar), plus a
 * quick-stats row: total orders, wishlist count and member-since date.
 *
 * Saving is a mock — it just shows a brief "Saved!" confirmation. There is
 * no backend yet, so the name/email changes are kept in local component
 * state rather than written back to AuthContext.
 */
function AccountOverview() {
  const { user } = useAuth()
  const { wishlist } = useWishlist()

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 98450 12345', // mock phone number
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Mock save — no backend. Flip the confirmation then fade it out.
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  const inputClass =
    'w-full rounded-xl border border-[#D8D0BA] bg-[#FBF9F4] py-3 pl-4 pr-4 text-sm text-[#2F2F2F] outline-none transition focus:border-[#6B7A58] focus:ring-4 focus:ring-[#6B7A58]/15'

  return (
    <div className="space-y-6">
      {/* ----- Editable account details card ----- */}
      <section className="rounded-2xl border border-[#E8E0CF] bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#2F2F2F]">Personal details</h3>
        <p className="mt-1 text-sm text-[#5C5A52]">
          Keep your account information up to date.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="overview-name"
              className="mb-2 block text-sm font-semibold text-[#2F2F2F]"
            >
              Full Name
            </label>
            <input
              id="overview-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="overview-email"
              className="mb-2 block text-sm font-semibold text-[#2F2F2F]"
            >
              Email
            </label>
            <input
              id="overview-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="overview-phone"
              className="mb-2 block text-sm font-semibold text-[#2F2F2F]"
            >
              Phone Number
            </label>
            <input
              id="overview-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-3 sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-[#6B7A58] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#556248] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58]"
            >
              Save Changes
            </button>

            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2E7D32]">
                <FiCheck size={16} aria-hidden="true" />
                Changes saved
              </span>
            )}
          </div>
        </form>
      </section>

      {/* ----- Quick stats row ----- */}
      <section aria-label="Account statistics" className="grid gap-4 sm:grid-cols-3">
        <StatBlock
          icon={<FiPackage size={17} aria-hidden="true" />}
          value={mockOrders.length}
          label="Total Orders"
        />
        <StatBlock
          icon={<FiHeart size={17} aria-hidden="true" />}
          value={wishlist.length}
          label="Wishlist Items"
        />
        <StatBlock
          icon={<FiCalendar size={17} aria-hidden="true" />}
          value={MEMBER_SINCE}
          label="Member Since"
        />
      </section>
    </div>
  )
}

export default AccountOverview

