import { Link } from 'react-router-dom'
import { FiChevronRight, FiPackage } from 'react-icons/fi'

import books from '../../data/books'
import { statusStyles } from './profileData'

/**
 * OrderCard
 * ---------
 * A single past-order summary: order number + date, a colour-coded status
 * badge pill, a small stacked row of book-cover thumbnails pulled from the
 * book ids stored on the mock order, the order total, and a "View Details"
 * link. Clicking a thumbnail goes straight to that book's page.
 */
function OrderCard({ order }) {
  const { id, date, status, total, items } = order

  // Resolve book ids -> full book objects so we can render real covers.
  const orderBooks = items
    .map((bookId) => books.find((book) => book.id === bookId))
    .filter(Boolean)

  return (
    <article className="rounded-2xl border border-[#E8E0CF] bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header: order number, date, status badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-[#2F2F2F]">Order #{id}</h3>
          <p className="mt-0.5 text-xs text-[#9A927F]">Placed on {date}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            statusStyles[status] || 'bg-[#F3EFE6] text-[#5C5A52]'
          }`}
        >
          {status}
        </span>
      </div>

      {/* Thumbnails + total + details link */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center">
          {orderBooks.length > 0 ? (
            orderBooks.slice(0, 4).map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                title={book.title}
                className="-ml-2 block transition-transform first:ml-0 hover:-translate-y-0.5"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-14 w-10 rounded-md object-cover shadow-sm ring-2 ring-white"
                />
              </Link>
            ))
          ) : (
            <span className="grid h-14 w-10 place-items-center rounded-md bg-[#F3EFE6] text-[#6B7A58]">
              <FiPackage size={18} aria-hidden="true" />
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-[#9A927F]">Total</p>
            <p className="text-base font-bold text-[#2F2F2F]">
              ₹{total.toLocaleString('en-IN')}
            </p>
          </div>
          <Link
            to="/orders"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#6B7A58] transition hover:text-[#556248]"
          >
            View Details
            <FiChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default OrderCard

