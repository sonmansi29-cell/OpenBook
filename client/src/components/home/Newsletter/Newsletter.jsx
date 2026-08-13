import { motion } from 'framer-motion'
import Container from '../../common/Container'

function Newsletter() {
  return (
    <motion.section
      id="newsletter"
      className="bg-[#F8F5EF] py-28"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <div className="rounded-[2rem] bg-[#6B7A58] px-8 py-10 text-white shadow-lg">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#E8E1D1]">
                Newsletter
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                Get weekly reading inspiration in your inbox
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F5F2EA]">
                Join our email list for seasonal picks, author spotlights, and exclusive release alerts.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-16 w-full rounded-full border-none bg-white px-5 py-3 text-sm text-[#2F2F2F] outline-none"
              />
              <button className="rounded-full bg-[#F8F5EF] px-6 py-3 text-sm font-semibold text-[#6B7A58] transition hover:bg-[#E6DDC8]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  )
}

export default Newsletter
