import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiGrid,
  FiPackage,
  FiMapPin,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiEdit3,
  FiChevronRight,
} from 'react-icons/fi'

import { useAuth } from '../../context/AuthContext'

/**
 * Tabs
 * ----
 * The id/value pairs drive the accessible tablist. The Wishlist entry is
 * intentionally a plain link (the /wishlist page already exists), so it is
 * kept out of the tablist itself.
 */
const TABS = [
  { id: 'overview', label: 'Account Overview', icon: FiGrid },
  { id: 'orders', label: 'Order History', icon: FiPackage },
  { id: 'addresses', label: 'Addresses', icon: FiMapPin },
  { id: 'settings', label: 'Account Settings', icon: FiSettings },
]

/**
 * ProfileSidebar
 * --------------
 * Left rail of the profile dashboard (~25% on desktop, sticky).
 *
 *  - User summary card: olive circular avatar with initials from AuthContext,
 *    full name, email and an "Edit Profile" quick link.
 *  - Accessible tablist below with full keyboard support (arrow keys move
 *    between tabs, Home/End jump to first/last, roving tabindex).
 *  - "Wishlist" is a link to the existing /wishlist page.
 *  - "Logout" calls AuthContext.logout() (which clears localStorage and flips
 *    the Navbar back to its "Login" button) then redirects home.
 *
 * On mobile the whole sidebar collapses into a horizontal scrollable bar;
 * the user card is hidden there to save vertical space.
 */
function ProfileSidebar({ activeTab, onChange }) {
  const { user, initials, logout } = useAuth()
  const navigate = useNavigate()
  const tabRefs = useRef({})

  /* Order of focusable tabs — used by the arrow-key handler below. */
  const tabOrder = TABS.map((tab) => tab.id)

  const focusTab = (id) => {
    tabRefs.current[id]?.focus()
  }

  const handleKeyDown = (event, id) => {
    const currentIndex = tabOrder.indexOf(id)
    let nextIndex = null

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        nextIndex = (currentIndex + 1) % tabOrder.length
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        nextIndex = (currentIndex - 1 + tabOrder.length) % tabOrder.length
        break
      case 'Home':
        event.preventDefault()
        nextIndex = 0
        break
      case 'End':
        event.preventDefault()
        nextIndex = tabOrder.length - 1
        break
      default:
        return
    }

    const nextId = tabOrder[nextIndex]
    onChange(nextId)
    focusTab(nextId)
  }

  const handleLogout = () => {
    logout() // clears the auth state -> Navbar reverts to "Login"
    navigate('/', { replace: true })
  }

  const tabClasses = (isActive) =>
    `flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58] ${
      isActive
        ? 'bg-[#6B7A58] text-white shadow-sm'
        : 'text-[#2F2F2F] hover:bg-[#6B7A58]/10 hover:text-[#6B7A58]'
    }`

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      {/* ----- User summary card (hidden on mobile — see below) ----- */}
      <div className="hidden rounded-2xl border border-[#E8E0CF] bg-white p-5 shadow-sm lg:block">
        <div className="flex items-center gap-4">
          {/* Avatar mirrors the navbar "MS" badge — olive bg + initials */}
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#6B7A58] text-lg font-bold text-white">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#2F2F2F]">{user?.name}</p>
            <p className="truncate text-xs text-[#9A927F]">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange('overview')}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7A58] transition hover:text-[#556248]"
        >
          <FiEdit3 size={13} aria-hidden="true" />
          Edit Profile
        </button>
      </div>

      {/* ----- Mobile user chip + horizontal scrollable tab bar ----- */}
      <div className="lg:hidden">
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-[#E8E0CF] bg-white p-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#6B7A58] text-sm font-bold text-white">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#2F2F2F]">{user?.name}</p>
            <p className="truncate text-xs text-[#9A927F]">{user?.email}</p>
          </div>
        </div>

        {/* Horizontal scrollable tab strip */}
        <div
          role="tablist"
          aria-label="Profile sections"
          className="flex gap-2 overflow-x-auto pb-2"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node
              }}
              role="tab"
              id={`profile-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`profile-panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, tab.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58] ${
                activeTab === tab.id
                  ? 'bg-[#6B7A58] text-white shadow-sm'
                  : 'bg-white text-[#2F2F2F] ring-1 ring-[#E8E0CF] hover:text-[#6B7A58]'
              }`}
            >
              {tab.label}
            </button>
          ))}
          {/* Wishlist + logout pinned at the end of the mobile strip */}
          <Link
            to="/wishlist"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#2F2F2F] ring-1 ring-[#E8E0CF] transition hover:text-[#6B7A58]"
          >
            <FiHeart size={15} aria-hidden="true" />
            Wishlist
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#D04545] ring-1 ring-[#E8E0CF] transition hover:bg-[#D04545]/10"
          >
            <FiLogOut size={15} aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>

      {/* ----- Desktop vertical tablist ----- */}
      <div
        role="tablist"
        aria-label="Profile sections"
        aria-orientation="vertical"
        className="mt-6 hidden lg:block"
      >
        <div className="rounded-2xl border border-[#E8E0CF] bg-white p-2 shadow-sm">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[tab.id] = node
                }}
                role="tab"
                id={`profile-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`profile-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onChange(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, tab.id)}
                className={tabClasses(isActive)}
              >
                <Icon size={16} aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}

          {/* Wishlist — links out to the existing /wishlist page */}
          <Link
            to="/wishlist"
            className="flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-[#2F2F2F] transition hover:bg-[#6B7A58]/10 hover:text-[#6B7A58] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58]"
          >
            <FiHeart size={16} aria-hidden="true" />
            Wishlist
            <FiChevronRight size={14} className="ml-auto text-[#9A927F]" aria-hidden="true" />
          </Link>

          {/* Logout — muted red, calls AuthContext.logout() */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-[#D04545] transition hover:bg-[#D04545]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D04545]"
          >
            <FiLogOut size={16} aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}

export default ProfileSidebar

