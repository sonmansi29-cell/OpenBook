import { useMemo, useState } from 'react'
import { bestSellers } from '@/data/books'
import BookCard from '../../books/BookCard'
import Container from '../../common/Container'
import SectionHeading from '../../common/SectionHeading'

const tabs = ['Best Sellers', 'New Arrivals', 'Trending', 'Staff Picks']

function BestSellers() {
  const [activeTab, setActiveTab] = useState('Best Sellers')

  const visibleBooks = useMemo(() => {
    if (activeTab === 'Best Sellers') return bestSellers

    return bestSellers.filter((book) => book.category === activeTab)
  }, [activeTab])

  return (
    <section id="best-sellers" className="bg-[#F8F5EF] py-28">
      <Container>
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading subtitle="Best Sellers" title="Browse All Books" className="mb-0 text-left" />

          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-[#6B7A58] text-white'
                      : 'bg-white text-[#6B7A58] ring-1 ring-[#E8E0CF] hover:bg-[#EEF1E7]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button className="self-start rounded-full bg-[#2F2F2F] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#101010] lg:self-auto">
              View All →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default BestSellers
