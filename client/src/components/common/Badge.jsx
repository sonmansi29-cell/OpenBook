function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-[#EFF4E8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7A58] ${className}`.trim()}>
      {children}
    </span>
  )
}

export default Badge
