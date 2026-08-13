import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'
import BookCard from '../../components/books/BookCard'
import { findCollectionBySlug, getBooksForCollection } from '../../data/collections'

/**
 * SkeletonCard
 * ------------
 * A lightweight placeholder shown while the collection detail page is
 * "loading". Mirrors the BookCard surface so the layout doesn't jump.
 */
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[24px] bg-white p-4 shadow-lg ring-1 ring-[#E8E0CF]">
      <div className="aspect-[3/4] w-full rounded-[18px] bg-[#E8E1D1]" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-[#E8E1D1]" />
        <div className="h-3 w-1/2 rounded bg-[#F0EBDD]" />
        <div className="h-3 w-2/3 rounded bg-[#F0EBDD]" />
      </div>
    </div>
  )
}

/**
 * CollectionDetail
 * ----------------
 * Dynamic route page rendered at `/collections/:slug`.
 *
 * It reads the slug from the URL, looks up the matching collection config in
 * src/data/collections.js, filters the real product dataset (src/data/books.js)
 * via the collection's `filter`/`sort`, and displays the matching books in the
 * same <BookCard /> grid used on the Shop/Home pages.
 */
function CollectionDetail() {
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)

  // ----- Lookup logic -----------------------------------------------------
  // The route param `:slug` is read via useParams(). We match it against the
  // SAME shared `collections` array (src/data/collections.js) that powers the
  // /collections grid, using Array.find() on the `slug` field. Because cards
  // build their links from `item.slug` too, a real collection should always be
  // found here.
  const collection = findCollectionBySlug(slug)

  // Dev-only guard: if a URL slug doesn't match any collection, log a warning
  // so future mismatches (renamed/removed slugs, stale links) are easy to catch.
  if (import.meta.env?.DEV && slug && !collection) {
    console.warn(
      `[CollectionDetail] No collection found for slug "${slug}". ` +
        'Check that the slug exists in src/data/collections.js.'
    )
  }

  // Resolve the real books that belong to this collection.
  const books = getBooksForCollection(collection)

  // Simulate a brief async "fetch" so we can show a skeleton loading state.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [slug])

  return (
    <>
      <Navbar />

      <main>
        {/* ---------- COLLECTION HERO ---------- */}
        <section className="bg-[#F8F5EF] py-16 text-center lg:py-20">
          <Container>
            {collection ? (
              <>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]"
                >
                  {collection.subtitle}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-[#2F2F2F] sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {collection.title}
                </motion.h1>
                {collection.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C5A52] sm:text-lg"
                  >
                    {collection.description}
                  </motion.p>
                )}
              </>
            ) : (
              <>
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-[#2F2F2F] sm:text-5xl"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Collection not found
                </motion.h1>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#5C5A52]">
                  The shelf you're looking for doesn't exist — but there are plenty of
                  others waiting to be explored.
                </p>
              </>
            )}
          </Container>
        </section>

        {/* ---------- BOOKS GRID ---------- */}
        <section className="bg-[#F8F5EF] pb-20 lg:pb-28">
          <Container>
            {!collection ? (
              /* Unknown slug → clean "not found" state with a fallback CTA. */
              <div className="flex flex-col items-center justify-center rounded-[24px] bg-white py-20 text-center ring-1 ring-[#E8E0CF]">
                <p className="text-5xl">🔍</p>
                <h2 className="mt-4 text-2xl font-bold text-[#2F2F2F]">
                  We couldn't find that shelf
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#5C5A52]">
                  The collection you're looking for may have been moved or renamed.
                </p>
                <Link to="/shop" className="mt-6 inline-block">
                  <Button className="px-7 py-3">Browse All Books</Button>
                </Link>
              </div>
            ) : loading ? (
              /* Loading state → show a skeleton grid. */
              <div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                aria-busy="true"
                aria-label={`Loading ${collection.title} books`}
              >
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : books.length > 0 ? (
              /* Real matching books → reuse the same BookCard grid as the Shop page. */
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              /* Zero matching books → friendly empty state with a fallback CTA. */
              <div className="flex flex-col items-center justify-center rounded-[24px] bg-white py-20 text-center ring-1 ring-[#E8E0CF]">
                <span className="text-5xl">📚</span>
                <h2 className="mt-4 text-2xl font-bold text-[#2F2F2F]">
                  More books coming to this shelf soon
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#5C5A52]">
                  We're still stocking this collection. Check back shortly, or browse the
                  full catalogue in the meantime.
                </p>
                <Link to="/shop" className="mt-6 inline-block">
                  <Button className="px-7 py-3">Browse All Books</Button>
                </Link>
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default CollectionDetail
