import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'
import CollectionCard from './components/CollectionCard'
import { shelfCollections, editorsPick } from '../../data/collections'

function Collections() {
  return (
    <>
      <Navbar />

      <main>
        {/* ---------- HERO ----------
            Centered editorial hero on the cream background. */}
        <section className="bg-[#F8F5EF] py-20 text-center lg:py-28">
          <Container>
            {/* Small uppercase label in olive green, letter-spaced */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]"
            >
              Collections
            </motion.p>

            {/* Large serif headline using the site's Playfair Display font */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#2F2F2F] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Curated shelves for every mood
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C5A52] sm:text-lg"
            >
              Thoughtfully gathered by our booksellers — find your next
              favourite read across six hand-picked shelves.
            </motion.p>
          </Container>
        </section>

        {/* ---------- COLLECTIONS GRID ----------
            Responsive: 1 col mobile, 2 on tablet, 3 on desktop. */}
        <section className="bg-[#F8F5EF] pb-20 lg:pb-28">
          <Container>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shelfCollections.map((item, index) => (
                <CollectionCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- EDITOR'S PICK BANNER ----------
            Horizontal card: image on one side, text + CTA on the other. */}
        <section className="bg-[#F8F5EF] pb-24 lg:pb-32">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="grid items-center gap-10 overflow-hidden rounded-[24px] bg-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.3)] ring-1 ring-[#E8E0CF] lg:grid-cols-2"
            >
              {/* Image side */}
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                <img
                  src={editorsPick.image}
                  alt={editorsPick.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-5 top-5 rounded-full bg-[#6B7A58] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  Editor's Pick
                </span>
              </div>

              {/* Text + CTA side */}
              <div className="px-6 pb-10 lg:py-16 lg:pr-14">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]">
                  Featured This Week
                </p>
                <h2
                  className="mt-4 text-3xl font-bold text-[#2F2F2F] sm:text-4xl"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {editorsPick.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[#5C5A52]">
                  {editorsPick.description}
                </p>
                <Link to={editorsPick.ctaLink} className="mt-8 inline-block">
                  <Button className="px-7 py-3 text-base">
                    {editorsPick.ctaLabel}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Collections
