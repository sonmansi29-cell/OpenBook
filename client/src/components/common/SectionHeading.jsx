function SectionHeading({ subtitle, title, className = '' }) {
  return (
    <div className={`mb-10 text-center ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]">
        {subtitle}
      </p>
      <h2 className="mx-auto mt-3 max-w-4xl text-4xl font-bold text-[#2F2F2F] lg:text-5xl">
        {title}
      </h2>
    </div>
  )
}

export default SectionHeading
