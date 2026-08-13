const Newsletter = () => {
  return (
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
  )
}

export default Newsletter
