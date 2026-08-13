import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'

/**
 * Orders
 * ------
 * Minimal placeholder page linked from the navbar account dropdown.
 * Real order history will be wired up once a backend/orders state exists.
 */
function Orders() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8F5EF] py-28">
        <Container>
          <SectionHeading subtitle="Orders" title="Your orders" />
          <div className="mx-auto max-w-md rounded-[24px] bg-white p-10 text-center shadow-lg ring-1 ring-[#E8E0CF]">
            <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#F3EFE6] text-[#6B7A58]">
              <FiShoppingBag size={26} />
            </span>
            <h3 className="text-xl font-bold text-[#2F2F2F]">No orders yet</h3>
            <p className="mt-2 text-sm text-[#5C5A52]">
              When you place an order it will show up here. Start browsing to find your next
              favourite read.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#6B7A58] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#556248]"
            >
              <FiShoppingBag size={16} />
              Browse Books
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default Orders

