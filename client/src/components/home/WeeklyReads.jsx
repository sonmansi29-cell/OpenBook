const weeklyReads = [
  {
    title: 'The Quiet House',
    author: 'Mira Sol',
    note: 'A tender story about memory, craft, and home.',
    badge: 'New',
  },
  {
    title: 'The Lantern Archive',
    author: 'Nora Vale',
    note: 'An atmospheric mystery set in a vanished library.',
    badge: 'Editor’s Pick',
  },
  {
    title: 'Fields of Winter',
    author: 'Jules Harrow',
    note: 'A lyrical journey through family legacy and change.',
    badge: 'Top Rated',
  },
]

const WeeklyReads = () => {
  return (
    <section id="readers" className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6B7A58]">Weekly Reads</p>
          <h2 className="mt-2 text-3xl font-bold text-[#2F2F2F]">Fresh recommendations from our editorial desk</h2>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {weeklyReads.map((book) => (
          <article key={book.title} className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-[#DDD5C4]">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-[#E8E1D1] px-3 py-1 text-xs font-semibold text-[#6B7A58]">{book.badge}</span>
              <span className="text-xs font-semibold text-[#6B7A58]">{book.author}</span>
            </div>
            <div className="rounded-[1.25rem] bg-gradient-to-br from-[#E9E4D4] to-[#DCE3CB] p-8 text-center text-3xl font-black text-[#6B7A58]">
              {book.title.slice(0, 1)}
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#2F2F2F]">{book.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#5C5A52]">{book.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default WeeklyReads
