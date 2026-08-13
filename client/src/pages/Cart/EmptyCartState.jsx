import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'

import emptyCartIllustration from '../../assets/images/Empty Cart Illustration.png'

/**
 * EmptyCartState
 * ---------------
 * Shown when the cart has no items. Uses the existing "Empty Cart Illustration"
 * asset and a pill-shaped "Continue Shopping" CTA linking to the shop.
 */
function EmptyCartState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-full flex flex-col items-center justify-center rounded-[24px] bg-white px-6 py-16 text-center shadow-lg ring-1 ring-[#E8E0CF] sm:py-20"
    >
      {/* Illustration */}
      <img
        src={emptyCartIllustration}
        alt="Empty cart illustration"
        className="mb-6 h-40 w-40 object-contain sm:h-48 sm:w-48"
      />

      {/* Heading */}
      <h3 className="text-2xl font-bold text-[#2F2F2F]">Your cart is empty</h3>

      {/* Helper copy */}
      <p className="mt-2 max-w-sm text-sm text-[#5C5A52]">
        Looks like you haven&apos;t added anything yet. Browse our curated collection and find
        your next great read.
      </p>

      {/* CTA button */}
      <Link
        to="/shop"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#6B7A58] px-7 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#556248] hover:shadow-lg"
      >
        Continue Shopping
        <FiArrowRight size={16} />
      </Link>
    </motion.div>
  )
}

export default EmptyCartState
