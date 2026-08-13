/**
 * StatBlock
 * ---------
 * Small reusable card for the quick-stats row on the Account Overview tab:
 * a soft olive icon chip on the left, a bold value and muted label on the
 * right. `<FiIcon />` is passed in as `icon`.
 */
function StatBlock({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#E8E0CF] bg-[#FBF9F4] p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#6B7A58]/10 text-[#6B7A58]">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-lg font-bold leading-tight text-[#2F2F2F] sm:text-xl">{value}</p>
        <p className="mt-0.5 truncate text-xs font-medium text-[#9A927F]">{label}</p>
      </div>
    </div>
  )
}

export default StatBlock

