import { motion, useReducedMotion } from 'framer-motion'
// Auto-rotating background carousel for the hero.
import HeroCarousel from './HeroCarousel'
// React Router Link for SPA navigation (no full page reload) on the hero CTAs
import { Link } from 'react-router-dom'
// The three rotating hero background images (imported so Vite bundles/hashes them).
import heroSlide1 from '../../../assets/images/hero/hero-bg-2.png'
import heroSlide2 from '../../../assets/images/home 2.jpg'
import heroSlide3 from '../../../assets/images/home 3.jpg'

const stats = [
  { value: '10K+', label: 'Books' },
  { value: '500+', label: 'Authors' },
  { value: '50K+', label: 'Readers' },
]

// The three rotating hero background slides.
// Slide 1 keeps the existing hero background; slides 2 & 3 are the new images.
// Each slide can carry its own optional overlay tweak for consistent contrast.
const heroSlides = [
  {
    src: heroSlide1,
    alt: 'OpenBook hero background',
  },
  {
    src: heroSlide2,
    alt: 'OpenBook home background 2',
  },
  {
    // home 3.jpg: the visual focus (stacked books) sits center-right with a
    // blurry desk/shelf on the left under the headline — strengthen the left
    // gradient here so text contrast stays strong and consistent across slides.
    src: heroSlide3,
    alt: 'OpenBook home background 3',
    overlay: {
      backgroundImage:
        'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0) 100%)',
    },
  },
]

function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Rotating background carousel (all slides + overlay handled internally) */}
      <HeroCarousel images={heroSlides} />

      <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center">
        <div className="mx-auto w-full max-w-7xl px-8 lg:px-12">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 font-semibold uppercase tracking-[4px] text-[#D8C3A5]"
            >
              Welcome to OpenBook
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-[#F5EDE1] backdrop-blur"
            >
              <span>✨</span>
              <span>Since 2026</span>
              <span className="text-white/70">•</span>
              <span>Premium Collection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-bold leading-[1.1] text-white lg:text-7xl"
              style={{ fontFamily: 'Playfair Display' }}
            >
              Discover Your Next Great Read
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg leading-8 text-gray-200"
            >
              Browse thousands of carefully curated books, timeless classics,
              modern bestsellers, and hidden gems—all in one beautiful place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
{/* Fix: converted CTA buttons to <Link> so they navigate to /collections
                  and /shop via React Router (SPA) and are natively keyboard-focusable */}
              <Link
                to="/collections"
                className="inline-flex h-16 items-center justify-center rounded-full bg-[#6B7A58] px-10 text-lg font-semibold text-white transition hover:bg-[#556248]"
              >
                Explore Collection
              </Link>

              <Link
                to="/shop"
                className="inline-flex h-16 items-center justify-center rounded-full border border-white px-10 text-lg font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Browse Books
              </Link>
            </motion.div>

            <div className="mt-14 flex flex-wrap gap-4 text-white sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                  className="min-w-[130px] rounded-xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md"
                >
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                  <p className="mt-1 text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.a
        href="#featured-collections"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white"
      >
        <span className="text-sm uppercase tracking-[0.25em] text-[#F5EDE1]/80">
          Scroll to Explore
        </span>
        <motion.span
          aria-hidden="true"
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0], opacity: [0.55, 1, 0.55] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="text-[#F5EDE1]/90"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.span>
      </motion.a>
    </section>
  )
}

export default Hero
