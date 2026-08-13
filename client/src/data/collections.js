import featuredBanner from '../assets/images/banners/featured-banner.png'
import newArrivalBanner from '../assets/images/banners/new-arrival-banner.png'
import bestsellerBanner from '../assets/images/banners/bestseller-banner.png'
import horrorImg from '../assets/images/Horror Books.jpg'
import educatedImg from '../assets/images/History3.jpg'
import midnightImg from '../assets/images/History4.jpg'
import psychMoneyImg from '../assets/images/Biography1.jpg'
import atomicImg from '../assets/images/Biography2.jpg'

import books from './books'

/**
 * COLLECTIONS DATA / CONFIG
 * -------------------------
 *
 * THIS FILE IS THE SINGLE SOURCE OF TRUTH for every collection on the site:
 *  - the "Featured Collections" cards on the Home page,
 *  - the `/collections` listing grid,
 *  - the dynamic `/collections/:slug` detail pages.
 *
 * The `/collections/:slug` detail page and every listing/featured card read
 * from this same array, so card links and detail lookups can never drift out
 * of sync again.
 *
 * Each entry provides:
 *  - id:          unique identifier (used as React key)
 *  - title:       display title shown on the card & detail page
 *  - subtitle:    small uppercase tag/label (e.g. "SEASONAL SHELF")
 *  - description: longer copy used on the detail page hero
 *  - image:       cover/banner image for the card
 *  - slug:        URL segment used for routing: `/collections/{slug}`
 *  - filter:      function(book) => boolean — which books from the real
 *                 product dataset (src/data/books.js) belong on this shelf
 *  - sort:        optional comparator passed to Array.sort for ordering books
 *  - featured:    when true, shown on the Home "Featured Collections" section
 *  - shelf:       when true, shown on the `/collections` listing grid
 *
 * To add a new collection later, just append another entry here — no JSX
 * edits needed. All sections map over this array.
 */

/**
 * @typedef {Object} Collection
 * @property {number} id               - unique React key
 * @property {string} title            - display title
 * @property {string} subtitle         - small uppercase label
 * @property {string} [description]    - detail-page hero copy
 * @property {string} image            - card cover/banner image (imported asset)
 * @property {string} slug             - URL segment for `/collections/:slug`
 * @property {(book: Object) => boolean} filter  - membership test on a book
 * @property {(a: Object, b: Object) => number} [sort] - optional ordering
 * @property {boolean} [featured]      - show on Home featured section
 * @property {boolean} [shelf]         - show on `/collections` grid
 */

/** @type {Collection[]} */
export const collections = [
  {
    id: 1,
    title: 'Autumn Reads',
    subtitle: 'Seasonal Shelf',
    description:
      'Warm, atmospheric stories to curl up with as the leaves fall — literary fiction, biography and romance for cozy evenings.',
    image: featuredBanner,
    slug: 'autumn-reads',
    featured: true,
    // Autumn Reads: fiction, biography and romance titles for cozy evenings.
    filter: (book) => ['Fiction', 'Biography', 'Romance'].includes(book.category),
    sort: (a, b) => a.title.localeCompare(b.title),
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Freshly Added',
    description:
      'Straight off the presses — the newest titles added to our shelves, ready for their first reader.',
    image: newArrivalBanner,
    slug: 'new-arrivals',
    featured: true,
    shelf: true,
    // New Arrivals: books flagged as new arrivals, newest first by dateAdded.
    filter: (book) => book.badge === 'New Arrival' || book.badge === 'New',
    sort: (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded),
  },
  {
    id: 3,
    title: 'Cozy Corner',
    subtitle: 'Quiet Escapes',
    description:
      'Gentle, immersive reads for slow afternoons — romance and comforting fiction that feel like a warm blanket.',
    image: bestsellerBanner,
    slug: 'cozy-corner',
    featured: true,
    // Cozy Corner: calming fiction & romance titles.
    filter: (book) => ['Romance', 'Fiction'].includes(book.category),
    sort: (a, b) => a.title.localeCompare(b.title),
  },
  {
    id: 4,
    title: 'Cozy Rainy Day Reads',
    subtitle: 'Rainy Day Shelf',
    description:
      'Slow-burning stories to curl up with when the skies open up — romantic and mysterious reads that feel like a warm blanket.',
    image: horrorImg,
    slug: 'cozy-rainy-day',
    shelf: true,
    // Cozy Rainy Day: romantic + mystery titles for slow, moody afternoons.
    filter: (book) => ['Romance', 'Mystery'].includes(book.category),
    sort: (a, b) => a.title.localeCompare(b.title),
  },
  {
    id: 5,
    title: 'Modern Classics',
    subtitle: 'Timeless & Modern',
    description:
      'Contemporary works already earning their place on the shelf — the modern favourites no reader should miss.',
    image: educatedImg,
    slug: 'modern-classics',
    shelf: true,
    // Modern Classics: books carrying the "Classic" badge (e.g. Pride & Prejudice,
    // The Alchemist, The Catcher in the Rye).
    filter: (book) => book.badge === 'Classic',
    sort: (a, b) => a.title.localeCompare(b.title),
  },
  {
    id: 6,
    title: 'Best of Sci-Fi',
    subtitle: 'Future Worlds',
    description:
      'Worlds beyond ours, for readers with an appetite for the future — imaginative fiction that stretches the mind.',
    image: midnightImg,
    slug: 'best-of-sci-fi',
    shelf: true,
    // Best of Sci-Fi: our most ambitious, speculative fiction titles.
    filter: (book) => book.category === 'Fiction',
    sort: (a, b) => b.rating - a.rating,
  },
  {
    id: 7,
    title: 'Books Under ₹500',
    subtitle: 'Budget Friendly',
    description:
      'Great stories that are kind to your wallet — a hand-picked selection of titles under ₹500.',
    image: psychMoneyImg,
    slug: 'under-500',
    shelf: true,
    // Books Under ₹500: anything currently priced below ₹500.
    filter: (book) => book.price < 500,
    sort: (a, b) => a.price - b.price,
  },
  {
    id: 8,
    title: 'Staff Picks',
    subtitle: 'Bookseller Favourites',
    description:
      'The books our booksellers simply cannot stop talking about — trusted recommendations from the team.',
    image: atomicImg,
    slug: 'staff-picks',
    shelf: true,
    // Staff Picks: books carrying the "Staff Pick" badge.
    filter: (book) => book.badge === 'Staff Pick',
    sort: (a, b) => b.rating - a.rating,
  },
]

// Collections to show on the Home "Featured Collections" section.
export const featuredCollections = collections.filter((c) => c.featured)

// Collections to show on the `/collections` listing grid.
export const shelfCollections = collections.filter((c) => c.shelf)

/**
 * editorsPick
 * -----------
 * Content for the "Editor's Pick" banner ("Featured This Week") on the
 * /collections page.
 *
 * The banner features ONE book — "The Midnight Library" — with review-style
 * copy and a "Read the Review" CTA. A single-book review is a Blog concept,
 * not a Collection (a collection is a themed shelf of many books). So the CTA
 * deliberately points at the matching blog REVIEW POST at `/blog/:slug`
 * (src/data/journal.js, slug `the-midnight-library`) rather than a collection
 * route. This keeps the button landing on real content and avoids the previous
 * bug where it pointed at a `/collections/editors-pick` shelf that did not
 * exist in the `collections` array (rendering the "Collection not found"
 * empty state).
 */
export const editorsPick = {
  title: 'The Midnight Library',
  alternateTitle: "Editor's Pick",
  description:
    'Between life and death there is a library, and within that library the shelves go on forever. This month we are enchanted by Matt Haig’s tender fable about second chances.',
  image: featuredBanner,
  ctaLabel: 'Read the Review',
  // Links to the blog review post for the featured book (see src/data/journal.js).
  ctaLink: '/blog/the-midnight-library',
}

/**
 * findCollectionBySlug
 * --------------------
 * Returns the collection config whose slug matches `slug`, or undefined.
 * Used by the CollectionDetail page to look up which collection a route refers
 * to. The lookup is plain, case-sensitive Array.find() against the shared
 * `collections` array — the single source of truth for all collections.
 */
export function findCollectionBySlug(slug) {
  return collections.find((collection) => collection.slug === slug)
}

/**
 * getBooksForCollection
 * ---------------------
 * Returns the real books from the product dataset that belong to a collection.
 * Applies the collection's `filter` function and optional `sort` comparator.
 * Returns a fresh array so callers can pass it straight to a grid.
 */
export function getBooksForCollection(collection) {
  if (!collection) return []
  const matched = books.filter(collection.filter || (() => false))
  return collection.sort ? [...matched].sort(collection.sort) : matched
}

