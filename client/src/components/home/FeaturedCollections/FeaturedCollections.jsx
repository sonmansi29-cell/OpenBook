import { motion } from 'framer-motion'
import CollectionCard from './CollectionCard'
import { featuredCollections as collections } from '../../../data/collections'

/**
 * FeaturedCollections
 * -------------------
 * Renders the "Featured Collections" section on the Home page.
 *
 * The cards are data-driven: this section maps over the `collections` config
 * array (src/data/collections.js) and renders a <CollectionCard /> for each.
 * Adding a new collection later means adding an entry to that array — no JSX
 * edits required here. Each card is a full <Link> to its `/collections/:slug`
 * detail page (see CollectionCard).
 */
function FeaturedCollections() {
  return (
    <section id="featured-collections" className="mx-auto max-w-7xl px-8 py-28 lg:px-12">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]">
          Featured Collections
        </p>
        <h2 className="mx-auto mt-3 max-w-4xl text-4xl font-bold text-[#2F2F2F] lg:text-6xl">
          Handpicked shelves for every kind of reader
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {collections.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <CollectionCard item={item} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedCollections
