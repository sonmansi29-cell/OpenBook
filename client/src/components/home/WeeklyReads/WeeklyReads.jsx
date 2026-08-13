import { motion } from 'framer-motion'
import { books } from '../../../data/books'
import BookCard from '../../books/BookCard'

function WeeklyReads() {
  return (
    <section id="weekly-reads" className="mx-auto max-w-7xl px-8 py-28 lg:px-12">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]">
          Weekly Reads
        </p>
        <h2 className="mt-3 text-4xl font-bold text-[#2F2F2F] lg:text-6xl">
          Most Loved This Week
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
          >
            <BookCard book={book} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default WeeklyReads
