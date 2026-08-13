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

const Collections = () => {
  return (
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
  )
}

export default Collections
