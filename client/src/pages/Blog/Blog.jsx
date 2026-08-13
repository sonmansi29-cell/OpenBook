import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiSearch, FiArrowRight, FiShoppingBag } from 'react-icons/fi'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'

import { blogCategories, featuredPost, blogPosts } from '../../data/journal'

/* ------------------------------------------------------------------ */
/*  Reveal — reusable scroll-animation wrapper.                        */
/*  Fades content in and slides it up as it enters the viewport.       */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  CategoryFilter — horizontal pill row of category tags + search.    */
/*  Active tag is filled olive; inactive tags are light/outlined.      */
/* ------------------------------------------------------------------ */
function CategoryFilter({ categories, active, onSelect, search, onSearch }) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Pill tags — keyboard accessible via buttons */}
      <div
        role="group"
        aria-label="Filter blog posts by category"
        className="flex flex-wrap gap-2.5"
      >
        {categories.map((category) => {
          const isActive = category === active
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-[#6B7A58] text-white shadow-sm hover:bg-[#556248]'
                  : 'border border-[#D8D0BA] bg-white text-[#6B7A58] hover:bg-[#F5F0E3]'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      {/* Search input aligned to the right on desktop */}
      <div className="relative w-full max-w-xs">
        <FiSearch
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A58]"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search posts…"
          aria-label="Search blog posts"
          className="h-12 w-full rounded-full border border-[#D8D0BA] bg-white pl-11 pr-4 text-sm text-[#2F2F2F] outline-none transition focus:border-[#6B7A58] focus:ring-2 focus:ring-[#6B7A58]/20"
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FeaturedPost — large horizontal banner card.                       */
/*  Cover image on one side, category, title, excerpt, meta + CTA on   */
/*  the other. Stacks vertically on small screens.                     */
/* ------------------------------------------------------------------ */
function FeaturedPost({ post }) {
  return (
    <article
      aria-label={`Featured post: ${post.title}`}
      className="grid overflow-hidden rounded-[24px] bg-white shadow-lg ring-1 ring-[#E8E0CF] lg:grid-cols-2"
    >
      {/* Cover image */}
      <div className="relative min-h-[260px] lg:min-h-full">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <span className="inline-flex w-fit rounded-full bg-[#EFF4E8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B7A58]">
          {post.category}
        </span>

        <h2
          className="mt-4 text-3xl font-bold leading-tight text-[#2F2F2F] sm:text-4xl"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {post.title}
        </h2>

        <p className="mt-4 max-w-xl text-base leading-7 text-[#5C5A52]">
          {post.excerpt}
        </p>

        {/* Author + date meta */}
        <div className="mt-6 flex items-center gap-3">
          <img
            src={post.authorAvatar}
            alt={post.author}
            loading="lazy"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-[#2F2F2F]">{post.author}</p>
            <p className="text-xs text-[#5C5A52]">
              {post.date} · {post.readTime}
            </p>
          </div>
        </div>

{/* Read more link — built from the post's slug so it always
            resolves to the matching /blog/:slug detail page. */}
        <Link
          to={`/blog/${post.slug}`}
          className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#6B7A58] transition-colors hover:text-[#556248]"
        >
          Read More
          <FiArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/*  BlogPostCard — compact card for the grid.                          */
/*  Rounded cover, category pill, 2-line-clamped title & excerpt,      */
/*  and an author avatar + name + date row. Hover lift on desktop.     */
/* ------------------------------------------------------------------ */
function BlogPostCard({ post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-white shadow-md ring-1 ring-[#E8E0CF] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
      {/* Cover image with rounded top corners */}
      <div className="overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit rounded-full bg-[#EFF4E8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B7A58]">
          {post.category}
        </span>

        <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-[#2F2F2F]">
          {post.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#5C5A52]">
          {post.excerpt}
        </p>

        {/* Author avatar + name + date row */}
        <div className="mt-auto flex items-center gap-3 pt-6">
          <img
            src={post.authorAvatar}
            alt={post.author}
            loading="lazy"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="text-xs">
            <p className="font-semibold text-[#2F2F2F]">{post.author}</p>
            <p className="text-[#5C5A52]">{post.date}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/*  NewsletterCTA — small horizontal band inviting subscriptions.      */
/* ------------------------------------------------------------------ */
function NewsletterCTA() {
  return (
    <Reveal>
      <section
        aria-label="Subscribe to the newsletter"
        className="rounded-[24px] bg-[#6B7A58] px-6 py-10 text-white shadow-lg sm:px-10"
      >
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#E8E1D1]">
              The Reading List
            </p>
            <h2
              className="mt-2 text-2xl font-bold sm:text-3xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Get weekly reading picks in your inbox
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#F5F2EA]">
              One short, hand-picked email every week — reviews, releases, and
              lists worth your shelf space.
            </p>
          </div>

          {/* Newsletter input + button reusing the site's style */}
          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="h-14 w-full rounded-full border-none bg-white px-5 py-3 text-sm text-[#2F2F2F] outline-none"
            />
            <Button className="shrink-0 bg-[#F8F5EF] px-6 py-3 text-[#6B7A58] hover:bg-[#E6DDC8]">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/*  Blog — the main page component.                                    */
/*  Reuses Navbar/Footer, Container, Button, and the shared data file  */
/*  so the copy and images are easy to swap for real CMS content.      */
/* ------------------------------------------------------------------ */
function Blog() {
  /* Filter + search state */
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  /* Pagination: start with 6 posts, load 3 more per click */
  const [visibleCount, setVisibleCount] = useState(6)
  const PAGE_SIZE = 3

  /* Filter posts by category + search term (memoised for performance) */
  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' || post.category === activeCategory
      const matchesSearch =
        query === '' ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchTerm])

  /* Only the currently visible slice of the filtered results */
  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPosts.length

  /* Reset pagination whenever the filter or search changes */
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setVisibleCount(6)
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    setVisibleCount(6)
  }

  return (
    <>
      <Navbar />

      <main>
        {/* ---------- HERO ----------
            Centered editorial hero on the cream background, matching the
            pattern used on the About and Collections pages. */}
        <section className="bg-[#F8F5EF] py-20 text-center lg:py-28">
          <Container>
            {/* Small uppercase olive label, letter-spaced */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]"
            >
              Blog
            </motion.p>

            {/* Large Playfair headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#2F2F2F] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Reading Journal
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C5A52] sm:text-lg"
            >
              Notes, reviews, and recommendations from the OpenBook shelves —
              written by the people who stock them.
            </motion.p>
          </Container>
        </section>

        {/* ---------- FILTER BAR ----------
            Category pills + search input, then the featured post and grid. */}
        <section className="bg-[#F8F5EF] pb-20 lg:pb-28">
          <Container>
            {/* Category filter + search */}
            <Reveal>
              <CategoryFilter
                categories={blogCategories}
                active={activeCategory}
                onSelect={handleCategoryChange}
                search={searchTerm}
                onSearch={handleSearchChange}
              />
            </Reveal>

            {/* Featured post banner */}
            <Reveal delay={0.1} className="mt-10">
              <FeaturedPost post={featuredPost} />
            </Reveal>

            {/* Blog post grid — 3 columns desktop, 2 tablet, 1 mobile */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.length > 0 ? (
                visiblePosts.map((post, index) => (
                  <Reveal key={post.id} delay={(index % 3) * 0.08}>
                    <BlogPostCard post={post} />
                  </Reveal>
                ))
              ) : (
                /* Empty state when no posts match the filter/search */
                <div className="col-span-full rounded-[24px] bg-white p-12 text-center shadow-md ring-1 ring-[#E8E0CF]">
                  <FiSearch size={36} className="mx-auto text-[#6B7A58]" />
                  <h3 className="mt-4 text-xl font-bold text-[#2F2F2F]">
                    No posts found
                  </h3>
                  <p className="mt-2 text-sm text-[#5C5A52]">
                    Try a different category or search term.
                  </p>
                </div>
              )}
            </div>

            {/* Load more button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <Button
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="px-8 py-3"
                >
                  Load More Posts
                </Button>
              </div>
            )}

            {/* Newsletter CTA strip */}
            <div className="mt-16">
              <NewsletterCTA />
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Blog
