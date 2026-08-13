import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'

import { mockOrders } from './profileData'
import OrderCard from './OrderCard'

/**
 * OrderHistory
 * ------------
 * Lists the user's past orders using <OrderCard />. Shows a friendly empty
 * state with a "Browse Books" CTA when there are no orders (the mock data
 * has three, but the empty state stays ready for a real backend).
 */
function OrderHistory() {
  if (mockOrders.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E8E0CF] bg-white p-10 text-center shadow-sm">
        <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#F3EFE6] text-[#6B7A58]">
          <FiShoppingBag size={26} aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold text-[#2F2F2F]">You haven’t placed any orders yet</h3>
        <p className="mt-2 text-sm text-[#5C5A52]">
          When you place an order it will show up here with its status and tracking details.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#6B7A58] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#556248]"
        >
          <FiShoppingBag size={16} aria-hidden="true" />
          Browse Books
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <header className="mb-1">
        <h3 className="text-lg font-bold text-[#2F2F2F]">Order History</h3>
        <p className="mt-1 text-sm text-[#5C5A52]">
          Your recent orders and their current status.
        </p>
      </header>

      {mockOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}

export default OrderHistory

