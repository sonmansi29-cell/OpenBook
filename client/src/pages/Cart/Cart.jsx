import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { AnimatePresence } from 'framer-motion'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import BookCard from '../../components/books/BookCard'

import { useCart } from '../../context/CartContext'

import CartItemRow from './CartItemRow'
import OrderSummary from './OrderSummary'
import EmptyCartState from './EmptyCartState'

import books from '../../data/books'

/**
 * Cart
 * -----
 * The main shopping cart page. Reuses the existing Navbar/Footer and the
 * shared CartContext (synced with the Navbar badge). Renders a responsive
 * two-column layout (items + order summary) and a "You might also like" grid.
 */
function Cart() {
  const { cartItems, clearCart } = useCart()

  const isEmpty = cartItems.length === 0

  // Suggested books — pick a handful that aren't already in the cart.
  const cartIds = new Set(cartItems.map((item) => item.id))
  const recommendations = books.filter((book) => !cartIds.has(book.id)).slice(0, 4)

  return (
    <>
      <Navbar />

      <main className="bg-[#F8F5EF] py-16 sm:py-24">
        <Container>
          {/* Hero section */}
          <SectionHeading subtitle="Cart" title="Shopping Cart" />

          {isEmpty ? (
            /* ---------- Empty state ---------- */
            <EmptyCartState />
          ) : (
            <>
              {/* ---------- Two-column layout ---------- */}
              <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
                {/* LEFT: Cart items list */}
                <section
                  aria-label="Cart items"
                  className="rounded-[24px] bg-white p-5 shadow-lg ring-1 ring-[#E8E0CF] sm:p-8"
                >
                  {/* Header row with count + clear */}
                  <div className="mb-2 flex items-center justify-between border-b border-[#E8E0CF] pb-5">
                    <h3 className="text-lg font-bold text-[#2F2F2F]">
                      Cart Items{' '}
                      <span className="text-sm font-semibold text-[#5C5A52]">
                        ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                      </span>
                    </h3>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#5C5A52] transition-colors hover:text-[#D04545]"
                    >
                      <FiShoppingBag size={13} />
                      Clear Cart
                    </button>
                  </div>

                  {/* Animated list of line items */}
                  <ul className="divide-y divide-[#E8E0CF]">
                    <AnimatePresence initial={false}>
                      {cartItems.map((item) => (
                        <CartItemRow key={item.id} item={item} />
                      ))}
                    </AnimatePresence>
                  </ul>
                </section>

                {/* RIGHT: Order summary */}
                <OrderSummary />
              </div>
            </>
          )}

          {/* ---------- "You might also like" section ---------- */}
          {!isEmpty && (
            <section className="mt-16 sm:mt-20">
              <div className="mb-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]">
                  Keep Exploring
                </p>
                <h3 className="mt-2 text-2xl font-bold text-[#2F2F2F] sm:text-3xl">
                  You might also like
                </h3>
              </div>

              {/* 4-column grid on desktop, horizontal scroll on mobile */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {recommendations.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-full border border-[#6B7A58] px-7 py-3 text-sm font-bold text-[#6B7A58] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6B7A58] hover:text-white"
                >
                  <FiShoppingBag size={16} />
                  Browse All Books
                </Link>
              </div>
            </section>
          )}
        </Container>
      </main>

      <Footer />
    </>
  )
}

export default Cart
