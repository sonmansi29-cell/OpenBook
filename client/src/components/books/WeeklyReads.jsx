import { weeklyReads } from '@/data/books'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import BookCard from './BookCard'

function WeeklyReads() {
  return (
    <section id="weekly-reads" className="bg-[#F8F5EF] py-28">
      <Container>
        <SectionHeading
          subtitle="Weekly Reads"
          title="Books Everyone Loves This Week"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {weeklyReads.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default WeeklyReads
