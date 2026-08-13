import { motion } from 'framer-motion'
import { featuredAuthors } from '@/data/authors'
import Container from '../../common/Container'
import SectionHeading from '../../common/SectionHeading'

function FeaturedAuthors() {
  return (
    <motion.section
      id="featured-authors"
      className="bg-[#F8F5EF] py-28"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <SectionHeading
          subtitle="Featured Authors"
          title="Meet the voices we’re celebrating this season"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredAuthors.map((author, index) => (
            <motion.article
              key={author.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="rounded-[24px] bg-white p-6 shadow-lg ring-1 ring-[#E8E0CF] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8E1D1] text-lg font-bold text-[#6B7A58]">
                  {author.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2F2F2F]">{author.name}</h3>
                  <p className="text-sm font-semibold text-[#6B7A58]">{author.specialty}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#5C5A52]">{author.bio}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </motion.section>
  )
}

export default FeaturedAuthors
