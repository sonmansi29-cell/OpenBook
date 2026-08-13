import { FaStar } from 'react-icons/fa'

export function RatingStars({ rating, size = 14 }) {
  return (
    <div className="flex gap-1" style={{ color: '#F5A623', fontSize: size }}>
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={index < Math.round(rating) ? 'opacity-100' : 'opacity-30'}
        />
      ))}
    </div>
  )
}

function Rating({ rating, showValue = true }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#2F2F2F]">
      <RatingStars rating={rating} />
      {showValue && (
        <span className="font-semibold text-[#6B7A58]">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}

export default Rating
