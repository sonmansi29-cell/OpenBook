function HeroButtons() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <button className="h-16 rounded-full bg-[#6B7A58] px-10 text-lg font-semibold text-white transition hover:bg-[#556248]">
        Explore Collection
      </button>
      <button className="h-16 rounded-full border border-[#6B7A58] bg-white/80 px-10 text-lg font-semibold text-[#6B7A58] transition hover:bg-[#ECE6D7]">
        Browse Books
      </button>
    </div>
  )
}

export default HeroButtons
