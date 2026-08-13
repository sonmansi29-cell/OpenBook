import { FiHeart } from 'react-icons/fi'

function WishlistButton({ active = false, onToggle }) {
  return (
    <button
      type="button"
      className={`shop-action-link ${active ? 'border-[#6B7A58] text-[#6B7A58]' : ''}`}
      onClick={onToggle}
    >
      <FiHeart size={16} className="mr-2" />
      {active ? 'Saved' : 'Wishlist'}
    </button>
  )
}

export default WishlistButton
