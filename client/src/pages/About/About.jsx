import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiBookOpen,
  FiUsers,
  FiHeart,
  FiGlobe,
  FiPenTool,
} from 'react-icons/fi'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import Button from '../../components/common/Button'

import aboutBanner from '../../assets/images/About Us Banner.png'

/* ------------------------------------------------------------------ */
/*  Reusable animation wrapper — fades in and slides up on scroll.     */
/*  Used across every section so the page feels consistently alive.    */
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
/*  ValueCard — small white card with an olive icon circle, a title,   */
/*  and a short description. Used in the "Our Mission" grid.           */
/* ------------------------------------------------------------------ */
function ValueCard({ icon, title, description, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <article className="flex h-full flex-col items-center rounded-[24px] bg-white p-8 text-center shadow-lg ring-1 ring-[#E8E0CF] transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-xl">
        {/* Olive green circle holding the icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#6B7A58] text-2xl text-white">
          {icon}
        </div>
        <h3 className="mt-5 text-xl font-bold text-[#2F2F2F]">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#5C5A52]">{description}</p>
      </article>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/*  CurationPoint — a single point in the "How We Choose Our Books"   */
/*  list. Deliberately NOT a card (avoids repeating the mission grid  */
/*  pattern): a small olive icon circle, a bold title, and a short     */
/*  description, separated by subtle vertical dividers on desktop.     */
/* ------------------------------------------------------------------ */
function CurationPoint({ icon, title, description, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="flex h-full flex-col items-center border-[#E8E0CF] px-6 text-center lg:border-r lg:last:border-r-0">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6B7A58] text-xl text-white">
          {icon}
        </div>
        <h3 className="mt-5 text-lg font-bold text-[#2F2F2F]">{title}</h3>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[#5C5A52]">
          {description}
        </p>
      </div>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/*  StatBlock — large bold number with a label underneath.             */
/*  Used in the "By the Numbers" olive stats band.                     */
/* ------------------------------------------------------------------ */
function StatBlock({ value, label, delay = 0 }) {
  return (
    <Reveal delay={delay} className="text-center">
      <p className="text-4xl font-black text-white sm:text-5xl">{value}</p>
      <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-[#E8E1D1]">
        {label}
      </p>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/*  Content data — kept in one place so copy edits are quick.          */
/* ------------------------------------------------------------------ */
const values = [
  {
    icon: <FiBookOpen />,
    title: 'Curated with Care',
    description:
      'Every book on our shelves is hand-picked by our team so you only ever meet stories worth your time.',
  },
  {
    icon: <FiUsers />,
    title: 'Stories for Everyone',
    description:
      'We champion diverse voices and diverse genres, because every reader deserves to see themself in a book.',
  },
  {
    icon: <FiHeart />,
    title: 'Community First',
    description:
      'We exist to support readers and local authors — hosting events, signing tables, and quiet corners to belong.',
  },
]

/* Curated-with-care details — expands the mission card above with        */
/* more texture, rendered as a clean (non-card) icon list.                */
const curationPoints = [
  {
    icon: <FiBookOpen />,
    title: 'Read before we recommend',
    description:
      'We read widely and often, so every recommendation is grounded in pages we have actually turned.',
  },
  {
    icon: <FiGlobe />,
    title: 'Diverse voices, every genre',
    description:
      'From literary fiction to sci-fi and everything between, our shelves celebrate many voices and many ways to read.',
  },
  {
    icon: <FiPenTool />,
    title: 'Independent authors welcome',
    description:
      'We love championing independent and local writers, giving their stories a home alongside the big names.',
  },
]

const stats = [
  { value: '10,000+', label: 'Books' },
  { value: '5,000+', label: 'Happy Readers' },
  { value: '50+', label: 'Local Authors' },
  { value: '4.9★', label: 'Average Rating' },
]

/* ------------------------------------------------------------------ */
/*  About — the main page component.                                   */
/*  Reuses Navbar/Footer, Container, SectionHeading, and Button.       */
/* ------------------------------------------------------------------ */
function About() {
  return (
    <>
      <Navbar />

      <main>
        {/* ---------- HERO ----------
            Centered editorial hero on the cream background, matching the
            pattern used on the Collections page. */}
        <section className="bg-[#F8F5EF] py-20 text-center lg:py-32">
          <Container>
            {/* Small uppercase olive label, letter-spaced */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]"
            >
              About
            </motion.p>

            {/* Large serif headline using the site's Playfair font */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#2F2F2F] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our story, our shelves, our readers
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C5A52] sm:text-lg"
            >
              OpenBook began with a simple belief: that a carefully chosen shelf
              can change the way you read, and the way you see the world.
            </motion.p>
          </Container>
        </section>

        {/* ---------- OUR STORY ----------
            Two-column layout: image on the left, text on the right.
            Stacks into a single column on mobile. */}
        <section className="bg-[#F8F5EF] pb-20 lg:pb-28">
          <Container>
            <Reveal>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* Image side */}
                <div className="overflow-hidden rounded-[24px] shadow-xl ring-1 ring-[#E8E0CF]">
                  <img
                    src={aboutBanner}
                    alt="The OpenBook shop interior with overflowing shelves"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

{/* Text side */}
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]">
                    Our Story
                  </p>
                  <h2
                    className="mt-4 text-3xl font-bold text-[#2F2F2F] sm:text-4xl"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    How OpenBook began
                  </h2>

                  {/* Comfortable reading width + generous line-height for   */}
                  {/* a premium, easy-to-read editorial feel on large screens. */}
                  <div className="mt-6 max-w-xl space-y-5 text-base leading-8 text-[#5C5A52] sm:text-lg">
                    <p>
                      OpenBook began as a small passion project — a corner
                      bookcase in a rented studio, stacked with the titles our
                      founder could not stop talking about. Friends would visit
                      for coffee and leave with a book, a bookmark, and a new
                      favourite author.
                    </p>
                    <p>
                      That little shelf grew into a beloved local shop, then a
                      wider community of readers who trusted us to put the right
                      story in their hands. Today we pair the warmth of that
                      first bookcase with an online shop that feels just as
                      personal.
                    </p>
                    <p>
                      Everything we do — the curation, the recommendations, the
                      events — is still guided by the same question: what would
                      delight a reader we truly care about?
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ---------- OUR MISSION ----------
            Centered heading + a 3-column grid of value cards. */}
        <section className="bg-[#F5F0E3] py-20 lg:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                subtitle="Our Mission"
                title="What we believe in"
              />
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value, index) => (
                <ValueCard
                  key={value.title}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </Container>
        </section>

{/* ---------- HOW WE CHOOSE OUR BOOKS ----------
            Replaces the old "Meet the Team" section. Keeps the page's
            rhythm but keeps it book-focused: a light icon list (NOT a
            card grid, so it doesn't repeat the mission cards above) that
            expands on our "Curated with Care" value with more texture. */}
        <section className="bg-[#F8F5EF] py-20 lg:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                subtitle="Curated With Care"
                title="How we choose our books"
              />
            </Reveal>

            <div className="grid gap-10 md:grid-cols-3">
              {curationPoints.map((point, index) => (
                <CurationPoint
                  key={point.title}
                  icon={point.icon}
                  title={point.title}
                  description={point.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- BY THE NUMBERS ----------
            Full-width olive green stats band with 4 stats side by side. */}
        <section
          aria-label="OpenBook by the numbers"
          className="bg-[#6B7A58] py-16 lg:py-20"
        >
          <Container>
            <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <StatBlock
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- CLOSING CTA ----------
            Centered heading, supporting text, and a pill button to /shop. */}
        <section className="bg-[#F8F5EF] py-20 text-center lg:py-28">
          <Container>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]">
                Visit Us
              </p>
              <h2
                className="mx-auto mt-4 max-w-3xl text-3xl font-bold text-[#2F2F2F] sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Join our reading community
              </h2>
<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C5A52] sm:text-lg">
                Browse our carefully curated shelves, and find the story that
                has been waiting just for you.
              </p>
              <Link to="/shop" className="mt-8 inline-block">
                <Button className="px-8 py-3 text-base">
                  Shop Our Collection
                </Button>
              </Link>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default About
