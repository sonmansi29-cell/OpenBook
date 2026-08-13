import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * CollectionCard
 * --------------
 * A reusable card that presents a single curated collection. It uses the
 * site's cream/olive/charcoal palette, a white rounded surface with a soft
 * shadow, and a Framer Motion fade-in + slide-up on scroll. The whole card
 * lifts gently on hover for a boutique, editorial feel.
 *
 * Props:
 *  - item: { id, title, description, image, slug }
 *  - index: used to stagger the scroll-in animation
 *
 * The "Explore Shelf" link below is generated dynamically from `item.slug`
 * (e.g. `/collections/${item.slug}`) rather than a hardcoded URL, so the card
 * always points to the same shelf the detail page looks up by slug.
 */
function CollectionCard({ item, index = 0 }) {
  return (
    <motion.article
      // Fade-in / slide-up triggered when the card scrolls into view
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      // Slight lift + stronger shadow on hover (warm, tactile feedback)
      whileHover={{ y: -8 }}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)] ring-1 ring-[#E8E0CF] transition-shadow duration-500 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.35)]"
    >
      {/* Cover image with slow zoom on hover */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={`${item.title} collection cover`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-[#2F2F2F]">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-[#5C5A52]">
          {item.description}
        </p>

        {/* "Explore Shelf →" text link (olive, keyboard-focusable).
            Generated dynamically from the collection's slug so it can never
            drift out of sync with the detail-page lookup. */}
        <Link
          to={`/collections/${item.slug}`}
          className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#6B7A58] transition-colors duration-300 hover:text-[#556248] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6B7A58]"
        >
          Explore Shelf
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </motion.article>
  )
}

export default CollectionCard
