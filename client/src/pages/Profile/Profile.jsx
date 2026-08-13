import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import { useAuth } from '../../context/AuthContext'

import ProfileSidebar from './ProfileSidebar'
import AccountOverview from './AccountOverview'
import OrderHistory from './OrderHistory'
import Addresses from './Addresses'
import AccountSettings from './AccountSettings'

/**
 * Profile
 * -------
 * The "Your account" dashboard.
 *
 * ROUTE PROTECTION
 * ----------------
 * This page is only meaningful for signed-in users. We read
 * `isAuthenticated` from AuthContext (the same source that powers the
 * navbar "MS" avatar). If no user is logged in we render <Navigate> back
 * to /login, passing the current location via `location.state.from` so the
 * Login page can return the user here after they sign in.
 *
 * TAB STATE
 * ---------
 * Tabs are local state rather than nested routes — the app's router is a
 * flat list in App.jsx and there is no nested-route layout, so local state
 * with ARIA tab semantics keeps things simple. Switching tabs triggers a
 * brief AnimatePresence fade/slide transition.
 */
function Profile() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('overview')

  /* ----- Route guard: not logged in -> send to /login ----- */
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'orders':
        return <OrderHistory />
      case 'addresses':
        return <Addresses />
      case 'settings':
        return <AccountSettings />
      case 'overview':
      default:
        return <AccountOverview />
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#F8F5EF]">
        {/* ---------- HERO ----------
            Same editorial pattern as Register/Blog/Contact: small uppercase
            olive label + large Playfair headline, centred on cream. */}
        <section className="pb-10 pt-20 text-center lg:pt-28">
          <Container>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]"
            >
              Profile
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#2F2F2F] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Your account
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C5A52] sm:text-lg"
            >
              Manage your details, track orders, and keep your reading life
              organised — all in one place.
            </motion.p>
          </Container>
        </section>

        {/* ---------- DASHBOARD ----------
            Left sidebar (~25%) + right content card (~75%). On desktop the
            sidebar is sticky; on mobile it collapses to a horizontal tab
            strip above the stacked content. */}
        <section className="pb-24 lg:pb-28">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)]">
              {/* LEFT — sticky sidebar with user card + tablist */}
              <ProfileSidebar activeTab={activeTab} onChange={setActiveTab} />

              {/* RIGHT — active tab content in a white rounded card */}
              <div
                role="tabpanel"
                id={`profile-panel-${activeTab}`}
                aria-labelledby={`profile-tab-${activeTab}`}
                className="rounded-[24px] bg-white p-6 shadow-lg ring-1 ring-[#E8E0CF] sm:p-8"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    {renderTab()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Profile

