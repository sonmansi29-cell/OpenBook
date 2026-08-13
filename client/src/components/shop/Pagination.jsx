import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

function Pagination({ currentPage, totalPages, onPageChange, pageSize, totalItems }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  // Smart pagination window
  const getVisiblePages = () => {
    if (totalPages <= 7) return pages
    const delta = 1
    const range = []
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i >= 1 && i <= totalPages) range.push(i)
    }
    const withDots = []
    let prev = 0
    range.forEach((page) => {
      if (prev && page - prev > 1) withDots.push('...')
      withDots.push(page)
      prev = page
    })
    if (range[0] > 2) withDots.unshift('...')
    if (!withDots.includes(1)) withDots.unshift(1)
    if (range[range.length - 1] < totalPages - 1) withDots.push('...')
    if (!withDots.includes(totalPages)) withDots.push(totalPages)
    return withDots
  }

  return (
    <div className="shop-pagination">
      <div className="shop-pagination-info">
        Showing <strong>{start}–{end}</strong> of <strong>{totalItems}</strong> books
      </div>
      <div className="shop-pagination-nav">
        <button
          type="button"
          className="shop-pagination-prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FiChevronLeft />
          Previous
        </button>

        {getVisiblePages().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="shop-pagination-ellipsis">
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={page === currentPage ? 'active' : ''}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          className="shop-pagination-next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <FiChevronRight />
        </button>
      </div>
    </div>
  )
}

export default Pagination
