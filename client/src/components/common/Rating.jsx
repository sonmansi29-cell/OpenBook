import { FaStar } from 'react-icons/fa'

function Rating({ rating = 0, showValue = true }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#2F2F2F]">
      <div className="flex gap-1 text-[#F5A623]">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className={index < Math.round(rating) ? 'opacity-100' : 'opacity-30'} />
        ))}
      </div>
      {showValue && <span className="font-semibold text-[#6B7A58]">{rating.toFixed(1)}</span>}
    </div>
  )
}

export default Rating
