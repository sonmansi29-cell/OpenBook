function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition'
  const variants = {
    primary: 'bg-[#6B7A58] text-white hover:bg-[#556248]',
    secondary: 'border border-[#D8D0BA] bg-white text-[#2F2F2F] hover:bg-[#F8F5EF]',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

export default Button
