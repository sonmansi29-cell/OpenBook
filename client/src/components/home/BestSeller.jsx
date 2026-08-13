const bestSellers = [
  { title: 'The Last Page', author: 'Ada Rowan', price: '$18.00' },
  { title: 'Ocean Letters', author: 'Theo Lane', price: '$21.00' },
  { title: 'Paper Bloom', author: 'Zara Finch', price: '$16.50' },
  { title: 'Map of Roads', author: 'Ivy Hart', price: '$19.25' },
]

const BestSeller = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6B7A58]">Best Sellers</p>
          <h2 className="mt-2 text-3xl font-bold text-[#2F2F2F]">Beloved titles readers keep returning to</h2>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {bestSellers.map((book, index) => (
          <article key={book.title} className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-[#DDD5C4]">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7A58]">
              <span>#{index + 1}</span>
              <span>Popular</span>
            </div>
            <div className="mt-5 rounded-[1.25rem] bg-gradient-to-br from-[#E9E4D4] to-[#DCE3CB] p-8 text-center text-3xl font-black text-[#6B7A58]">
              {book.title.slice(0, 1)}
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#2F2F2F]">{book.title}</h3>
            <p className="mt-1 text-sm text-[#5C5A52]">{book.author}</p>
            <p className="mt-3 text-sm font-semibold text-[#6B7A58]">{book.price}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BestSeller
