import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'
import { featuredPost, blogPosts } from '../../data/journal'

/**
 * findPostBySlug
 * --------------
 * Returns the blog post whose `slug` matches `slug`, checking the featured
 * post first, then the archive grid. This is the counterpart to the collection
 * lookup in src/data/collections.js — both read from their single shared data
 * source so a /blog/:slug URL always resolves to real content.
 */
function findPostBySlug(slug) {
  if (featuredPost.slug === slug) return featuredPost
  return blogPosts.find((post) => post.slug === slug)
}

/**
 * BlogPostDetail
 * --------------
 * Dynamic route page rendered at `/blog/:slug`.
 *
 * It reads the slug from the URL, looks up the matching post in
 * src/data/journal.js, and renders the review/article in full with a
 * back-link to the Blog index. This is where the "Read the Review" CTA on the
 * /collections "Featured This Week" banner lands (the "The Midnight Library"
 * review post).
 */
function BlogPostDetail() {
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)

  const post = findPostBySlug(slug)

  // Dev-only guard: log a warning so a stale /blog/:slug URL is easy to catch.
  if (import.meta.env?.DEV && slug && !post) {
    console.warn(
      `[BlogPostDetail] No post found for slug "${slug}". ` +
        'Check that the slug exists in src/data/journal.js.'
    )
  }

  // Scroll to top on navigation and simulate a brief "fetch" for a skeleton.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [slug])

  return (
    <>
      <Navbar />

      <main>
        {/* ---------- POST HERO ---------- */}
        <section className="bg-[#F8F5EF] py-16 text-center lg:py-20">
          <Container>
            {post ? (
              <>
                <Link
                  to="/blog"
                  className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#6B7A58] transition-colors hover:text-[#556248]"
                >
                  <FiArrowLeft size={16} />
                  Back to the Journal
                </Link>

                <span className="inline-flex w-fit rounded-full bg-[#EFF4E8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B7A58]">
                  {post.category}
                </span>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#2F2F2F] sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {post.title}
                </motion.h1>

                {/* Author + date meta */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-[#2F2F2F]">{post.author}</p>
                    <p className="text-xs text-[#5C5A52]">
                      {post.date} · {post.readTime || '4 min read'}
                    </p>
                  </div>
                </div>
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
                  Post not found
                </motion.h1>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#5C5A52]">
                  The article you're looking for doesn't exist — but the Journal has plenty
                  more waiting to be read.
                </p>
              </>
            )}
          </Container>
        </section>

        {/* ---------- POST BODY ---------- */}
        <section className="bg-[#F8F5EF] pb-20 lg:pb-28">
          <Container>
            {!post ? (
              /* Unknown slug → clean "not found" state with a fallback CTA. */
              <div className="flex flex-col items-center justify-center rounded-[24px] bg-white py-20 text-center ring-1 ring-[#E8E0CF]">
                <p className="text-5xl">🔍</p>
                <h2 className="mt-4 text-2xl font-bold text-[#2F2F2F]">
                  We couldn't find that article
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#5C5A52]">
                  The post you're looking for may have been moved or renamed.
                </p>
                <Link to="/blog" className="mt-6 inline-block">
                  <Button className="px-7 py-3">Back to the Journal</Button>
                </Link>
              </div>
            ) : loading ? (
              /* Loading state → simple skeleton. */
              <div
                className="animate-pulse space-y-6 rounded-[24px] bg-white p-8 shadow-lg ring-1 ring-[#E8E0CF] sm:p-12"
                aria-busy="true"
                aria-label={`Loading ${post.title}`}
              >
                <div className="aspect-[16/7] w-full rounded-[18px] bg-[#E8E1D1]" />
                <div className="h-4 w-3/4 rounded bg-[#E8E1D1]" />
                <div className="h-4 w-full rounded bg-[#F0EBDD]" />
                <div className="h-4 w-5/6 rounded bg-[#F0EBDD]" />
              </div>
            ) : (
              /* Real post → cover image + full content. */
              <article className="overflow-hidden rounded-[24px] bg-white shadow-lg ring-1 ring-[#E8E0CF]">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="max-h-[420px] w-full object-cover"
                />
                <div className="px-6 py-10 sm:px-12 sm:py-14">
                  <p className="text-sm leading-7 text-[#5C5A52]">{post.excerpt}</p>
                  {Array.isArray(post.content) && post.content.length > 0 && (
                    <div className="mt-8 space-y-6">
                      {post.content.map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-base leading-8 text-[#4A473F]"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default BlogPostDetail
