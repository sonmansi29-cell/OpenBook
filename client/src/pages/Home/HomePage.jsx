const featuredCollections = [
  {
    title: 'Modern Classics',
    description: 'Timeless novels, essays, and poetry for reflective readers.',
    accent: 'from-emerald-200 to-lime-100',
  },
  {
    title: 'Studio Picks',
    description: 'Curated shelves with the most-loved stories of the week.',
    accent: 'from-amber-200 to-orange-100',
  },
  {
    title: 'Weekend Reads',
    description: 'Gentle, immersive titles perfect for slow afternoons.',
    accent: 'from-sky-200 to-cyan-100',
  },
]

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

const bestSellers = [
  { title: 'The Last Page', author: 'Ada Rowan', price: '$18.00' },
  { title: 'Ocean Letters', author: 'Theo Lane', price: '$21.00' },
  { title: 'Paper Bloom', author: 'Zara Finch', price: '$16.50' },
  { title: 'Map of Roads', author: 'Ivy Hart', price: '$19.25' },
]

const featuredAuthors = [
  {
    name: 'Leena Brooks',
    specialty: 'Literary Fiction',
    text: 'Writes immersive, deeply human stories that linger well after the last page.',
  },
  {
    name: 'Harun Fields',
    specialty: 'Essays & Memoir',
    text: 'Crafts reflective, sharply observed writing about places, memory, and identity.',
  },
]

const testimonials = [
  {
    quote: 'OpenBook feels like finding a friend who knows exactly what deserves to be read next.',
    author: 'Anika R.',
  },
  {
    quote: 'Beautiful curation, polished presentation, and an incredibly easy browsing experience.',
    author: 'Mason T.',
  },
  {
    quote: 'The weekly recommendations are wonderfully thoughtful and never overwhelming.',
    author: 'Priya S.',
  },
]

function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#2F2F2F]">
      <header className="sticky top-0 z-50 border-b border-[#D8D0BF] bg-[#F8F5EF]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B7A58] text-lg font-bold text-white">
              O
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide text-[#6B7A58]">OpenBook</p>
              <p className="text-xs text-[#6B7A58]">Curated reads for every mood</p>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#4E5A3C] md:flex">
            <a href="#home" className="transition hover:text-[#4B5F41]">Home</a>
            <a href="#collections" className="transition hover:text-[#4B5F41]">Collections</a>
            <a href="#readers" className="transition hover:text-[#4B5F41]">Weekly Reads</a>
            <a href="#authors" className="transition hover:text-[#4B5F41]">Authors</a>
            <a href="#newsletter" className="transition hover:text-[#4B5F41]">Newsletter</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-[#6B7A58] px-4 py-2 text-sm font-semibold text-[#6B7A58] hover:bg-[#E8E1D1]">
              Sign In
            </button>
            <button className="rounded-full bg-[#6B7A58] px-4 py-2 text-sm font-semibold text-white hover:bg-[#48533A]">
              Join Now
            </button>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit rounded-full bg-[#E8E1D1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7A58]">
              Discover your next favorite book
            </span>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-[#2F2F2F] md:text-5xl">
              Thoughtfully chosen stories for slow, beautiful reading.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5C5A52]">
              Explore handpicked shelves, beloved new releases, and unforgettable authors in one serene reading companion.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-[#6B7A58] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#48533A]">
                Shop Collection
              </button>
              <button className="rounded-full border border-[#6B7A58] px-6 py-3 text-sm font-semibold text-[#6B7A58] hover:bg-[#ECE6D7]">
                Browse New Arrivals
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-[#DDD5C4]">
                <p className="text-2xl font-bold text-[#6B7A58]">2.4k+</p>
                <p className="mt-1 text-sm text-[#5C5A52]">Readers served</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-[#DDD5C4]">
                <p className="text-2xl font-bold text-[#6B7A58]">150+</p>
                <p className="mt-1 text-sm text-[#5C5A52]">Curated titles</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-[#DDD5C4]">
                <p className="text-2xl font-bold text-[#6B7A58]">48h</p>
                <p className="mt-1 text-sm text-[#5C5A52]">Fast dispatch</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#E9E4D4] via-[#F6F1E7] to-[#D9E0C7] p-6 shadow-[0_24px_90px_-40px_rgba(87,96,69,0.55)]">
            <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#6B7A58]">
              Featured this week
            </div>
            <div className="mt-10 rounded-[1.5rem] bg-white/80 p-5 shadow-sm ring-1 ring-[#E0D7C3]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6B7A58]">Book of the Day</p>
                  <h2 className="mt-3 text-2xl font-bold text-[#2F2F2F]">The Atlas of Quiet Places</h2>
                </div>
                <span className="rounded-full bg-[#E8E1D1] px-3 py-1 text-xs font-semibold text-[#6B7A58]">4.9 ★</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.25rem] bg-gradient-to-br from-[#C8D3AE] to-[#EEF2DF] p-8 text-center text-4xl font-black text-[#6B7A58]">
                  A
                </div>
                <div className="space-y-3 text-sm text-[#5C5A52]">
                  <p>By Amelia Wren</p>
                  <p>A luminous novel about home, migration, and memory.</p>
                  <p className="font-semibold text-[#4E5A3C]">$24.00</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="collections" className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6B7A58]">Featured Collections</p>
              <h2 className="mt-2 text-3xl font-bold text-[#2F2F2F]">Curated shelves to match your mood</h2>
            </div>
            <a href="#" className="text-sm font-semibold text-[#6B7A58] hover:text-[#48533A]">View all</a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featuredCollections.map((collection) => (
              <article key={collection.title} className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-[#DDD5C4]">
                <div className={`h-44 bg-gradient-to-br ${collection.accent} p-6`}>
                  <div className="flex h-full items-end justify-between">
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#6B7A58]">Featured</span>
                    <span className="text-4xl font-black text-[#6B7A58]">{collection.title[0]}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#2F2F2F]">{collection.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5C5A52]">{collection.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

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

        <section id="authors" className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6B7A58]">Featured Authors</p>
            <h2 className="mt-2 text-3xl font-bold text-[#2F2F2F]">Meet the voices we’re celebrating this season</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {featuredAuthors.map((author) => (
              <article key={author.name} className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-[#DDD5C4]">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8E1D1] text-xl font-bold text-[#6B7A58]">
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2F2F2F]">{author.name}</h3>
                    <p className="text-sm font-semibold text-[#6B7A58]">{author.specialty}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#5C5A52]">{author.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6B7A58]">Testimonials</p>
            <h2 className="mt-2 text-3xl font-bold text-[#2F2F2F]">Readers say it feels like a library designed for joy</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.author} className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-[#DDD5C4]">
                <p className="text-lg leading-8 text-[#4E5A3C]">“{testimonial.quote}”</p>
                <p className="mt-5 text-sm font-semibold text-[#6B7A58]">{testimonial.author}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="newsletter" className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
          <div className="rounded-[2rem] bg-[#6B7A58] px-8 py-10 text-white shadow-lg">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#E8E1D1]">Newsletter</p>
                <h2 className="mt-2 text-3xl font-bold">Get weekly reading inspiration in your inbox</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F5F2EA]">
                  Join our list for seasonal picks, author spotlights, and exclusive release alerts.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border-none bg-white px-5 py-3 text-sm text-[#2F2F2F] outline-none"
                />
                <button className="rounded-full bg-[#F8F5EF] px-6 py-3 text-sm font-semibold text-[#6B7A58] hover:bg-[#E6DDC8]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#D8D0BF] bg-[#F5F0E3]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 text-sm text-[#5C5A52] md:grid-cols-4 lg:px-8">
          <div>
            <p className="text-lg font-bold text-[#6B7A58]">OpenBook</p>
            <p className="mt-2">A bookshop for thoughtful readers, beautiful shelves, and everyday discovery.</p>
          </div>
          <div>
            <p className="font-semibold text-[#2F2F2F]">Shop</p>
            <ul className="mt-2 space-y-2">
              <li>New Releases</li>
              <li>Best Sellers</li>
              <li>Gift Cards</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#2F2F2F]">About</p>
            <ul className="mt-2 space-y-2">
              <li>Our Story</li>
              <li>Authors</li>
              <li>Events</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#2F2F2F]">Support</p>
            <ul className="mt-2 space-y-2">
              <li>Contact</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
