import { motion } from 'framer-motion'
import { readingJournal } from '@/data/journal'
import Container from '../../common/Container'
import SectionHeading from '../../common/SectionHeading'

function ReadingJournal() {
  return (
    <motion.section
      id="reading-journal"
      className="bg-white py-28"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <SectionHeading
          subtitle="Reading Journal"
          title="Notes, essays, and thoughtful recommendations"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {readingJournal.map((entry, index) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="overflow-hidden rounded-[24px] bg-[#F8F5EF] shadow-lg ring-1 ring-[#E8E0CF] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <img src={entry.image} alt={entry.title} className="h-48 w-full object-cover" />

              <div className="p-6">
                <span className="rounded-full bg-[#E8E1D1] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7A58]">
                  {entry.category}
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#2F2F2F]">{entry.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5C5A52]">{entry.excerpt}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7A58]">
                  {entry.date}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </motion.section>
  )
}

export default ReadingJournal
