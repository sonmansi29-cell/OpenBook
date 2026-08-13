import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

// Auto-advance interval (ms) — keep the banner moving without feeling rushed.
const AUTO_ADVANCE_MS = 5000
// Slide transition duration (ms) — crisp and responsive, around 450ms.
const TRANSITION_MS = 450

/**
 * HeroCarousel
 * Rotating full-bleed background for the hero section.
 *
 * Behaviour:
 *  - Auto-advances every 5s, looping infinitely (index wraps via modulo).
 *  - Slides the incoming image in from the right while the outgoing image
 *    exits to the left (right→left slide), using Framer Motion AnimatePresence.
 *  - Clickable dot indicators at the bottom; clicking a dot jumps to that slide
 *    and resets the auto-advance timer.
 *  - Pauses auto-advance on hover (desktop) so users can read the text without
 *    the background changing underneath them, then resumes on mouse leave.
 *  - Respects prefers-reduced-motion: auto-advance is disabled and transition
 *    degrades to a simple crossfade instead of a slide.
 *
 * Props:
 *  - images: array of { src, alt?, overlay? } — pass different images or adjust
 *    the per-slide gradient overlay here. Adding a 4th slide is a one-line change.
 */
export default function HeroCarousel({ images }) {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false)
  const [imagesReady, setImagesReady] = useState(false)

  // Keep latest index in a ref so the interval callback always advances from
  // the current slide without needing to be re-created on every index change.
  const indexRef = useRef(index)
  indexRef.current = index

  // Preload every image up front and only start auto-advance once the whole set
  // is ready. That prevents the first slide swap from stalling on image fetches.
  const preloadImages = useCallback((slides) => {
    if (!slides?.length) {
      setImagesReady(true)
      return Promise.resolve()
    }

    return Promise.all(
      slides.map(
        ({ src }) =>
          new Promise((resolve) => {
            const img = new Image()
            img.decoding = 'async'
            img.onload = () => resolve()
            img.onerror = () => resolve()
            img.src = src
          })
      )
    ).then(() => {
      setImagesReady(true)
    })
  }, [])

  useEffect(() => {
    let isMounted = true

    setImagesReady(false)
    preloadImages(images).finally(() => {
      if (isMounted) {
        setImagesReady(true)
      }
    })

    return () => {
      isMounted = false
    }
  }, [images, preloadImages])

  // Resets the auto-advance timer whenever the current index changes, so a
  // manual dot click (or the wrapped-around auto-advance) restarts the countdown.
  const goTo = useCallback(
    (target) => {
      setDirection(target > indexRef.current ? 1 : -1)
      setIndex(target)
    },
    []
  )

  // Auto-advance: run only when reduced-motion is NOT preferred, the carousel
  // is not paused, and the full image set is already cached.
  useEffect(() => {
    if (prefersReducedMotion || isPaused || !imagesReady || images.length <= 1) {
      return undefined
    }

    const timer = setInterval(() => {
      // Loop infinitely: after the last image, wrap back around to the first.
      setIndex((prev) => (prev + 1) % images.length)
    }, AUTO_ADVANCE_MS)

    return () => clearInterval(timer) // cleanup on unmount
  }, [prefersReducedMotion, isPaused, imagesReady, images.length])

  // Slide variants. When reduced motion is preferred we fall back to a simple
  // crossfade (opacity only, no horizontal slide) for accessibility.
  const slideVariants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir) => ({ x: dir >= 0 ? '100%' : '-100%' }),
        center: { x: '0%' },
        exit: (dir) => ({ x: dir >= 0 ? '-100%' : '100%' }),
      }

  const slideTransition = prefersReducedMotion
    ? { duration: 0.25, ease: 'easeOut' }
    : { duration: TRANSITION_MS / 1000, ease: 'easeOut' }

  return (
    <div
      className="absolute inset-0 h-full w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)} // pause auto-advance on hover
      onMouseLeave={() => setIsPaused(false)} // resume when mouse leaves
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className="absolute inset-0 h-full w-full"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
            backgroundColor: '#151515',
          }}
        >
          {/* Consistent object-cover fills the full hero height on every slide,
              so the hero never jumps/downsizes between images (no layout shift). */}
          <img
            src={images[index].src}
            alt={images[index].alt || 'OpenBook hero background'}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{ backgroundColor: '#151515' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Per-slide dark overlay/gradient stacked on top of the image for
              consistent text readability across all three slides. */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"
            style={images[index].overlay}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators — centered horizontally, positioned above the
          "Scroll to Explore" text, clickable to jump to a specific slide. */}
      <div
        className="absolute bottom-24 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3"
        role="tablist"
        aria-label="Hero slides"
      >
        {images.map((_, i) => {
          const active = i === index
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)} // jump directly + reset auto-advance timer
              className={`rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8C3A5] ${
                active
                  ? 'h-3 w-8 bg-[#F5EDE1] ring-2 ring-[#6B7A58]' // active: filled cream, larger, olive ring
                  : 'h-2.5 w-2.5 bg-[#F5EDE1]/40 hover:bg-[#F5EDE1]/70' // inactive: smaller, low opacity
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
