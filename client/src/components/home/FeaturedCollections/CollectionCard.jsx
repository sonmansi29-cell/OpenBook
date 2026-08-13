import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * CollectionCard
 * --------------
 * Renders a single "Featured Collection" card on the Home page.
 *
 * The ENTIRE card is wrapped in a React Router <Link> so clicking anywhere
 * on the card (image, title, or the "Explore" pill) navigates to the
 * collection's filtered detail page at `/collections/{slug}`.
 *
 * Accessibility: using a native <Link> means the card is focusable and can be
 * activated with Enter without any extra JS. The old "Explore" <button> has
 * been converted into a visual-only <span> so there is no nested interactive
 * element conflict inside the link.
 *
 * Props:
 *  - item: { id, title, subtitle, image, slug }
 */
function CollectionCard({ item }) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.5 }}
      // `block` + `h-full` keeps the link filling the card surface.
      className="group block h-full overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)] ring-1 ring-[#E8E0CF] transition-all duration-500"
    >
      <Link
        to={`/collections/${item.slug}`}
        aria-label={`Explore ${item.title}`}
        className="block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6B7A58]"
      >
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F0E6D4]">
              {item.subtitle}
            </p>
            <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>
            {/* Visual-only pill (not a real button) so it doesn't create a
                nested interactive element inside the wrapping <Link>. */}
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2 text-sm font-semibold text-[#4E5A3C] transition group-hover:gap-3 group-hover:bg-[#F1E7CD]">
              <span>Explore</span>
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default CollectionCard
