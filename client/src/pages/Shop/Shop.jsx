import { useEffect, useState } from 'react'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import books from '../../data/books'
import SearchBar from '../../components/shop/SearchBar'
import SortDropdown from '../../components/shop/SortDropdown'
import FilterSidebar from '../../components/shop/FilterSidebar'
import ProductGrid from '../../components/shop/ProductGrid'
import Pagination from '../../components/shop/Pagination'
import QuickViewModal from '../../components/shop/QuickViewModal'
import useBookFilters, { PRICE_RANGES } from '../../hooks/useBookFilters'
import useRequireAuth from '../../hooks/useRequireAuth'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { FiCheckCircle } from 'react-icons/fi'

import './Shop.css'

const pageSize = 8

const categories = [...new Set(books.map((book) => book.category))]
  .map((name) => ({
    name,
    count: books.filter((book) => book.category === name).length,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

const priceRanges = PRICE_RANGES

function Shop() {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)
  // Toast notification shown briefly after a successful add-to-cart.
  const [toast, setToast] = useState(null)
const { wishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { requireAuth } = useRequireAuth()

  // All filter/sort/search state lives here and is synced to the URL query string.
  const {
    searchValue,
    selectedCategories,
    categoryFilter,
    priceRange,
    minRating,
    inStockOnly,
    sortOption,
    toggleCategory,
    setPrice,
    setRating,
    setInStock,
    setSort,
    setSearch,
    setCategoryFilter,
    clearAll,
    filteredBooks,
  } = useBookFilters(books)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = filterOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [filterOpen])

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const paginatedBooks = filteredBooks.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize,
  )

  const onChangePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Show the toast and auto-hide it after a moment.
  const showToast = (message) => {
    setToast(message)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 2000)
  }

// Gated add-to-cart: logged-out users are redirected to /login with the
  // pending action so it can be completed automatically after they sign in.
  const handleAddToCart = (book, quantity = 1) => {
    if (!requireAuth({ type: 'cart', book, quantity })) return
    addToCart(book, quantity)
    showToast(`${book.title} added to cart`)
  }

  // Gated wishlist toggle: logged-out users are redirected to /login and the
  // book is added automatically after they sign in (see Login.replayPendingAction).
  const handleToggleWishlist = (id) => {
    if (!requireAuth({ type: 'wishlist', bookId: id })) return
    toggleWishlist(id)
  }

  const activePriceLabel =
    priceRanges.find((r) => r.id === priceRange && r.id !== 'all')?.label || null

  const activeFilters = [
    ...selectedCategories.map((cat) => ({
      key: `cat-${cat}`,
      label: cat,
      onRemove: () => toggleCategory(cat),
    })),
    ...(activePriceLabel
      ? [
          {
            key: `price-${priceRange}`,
            label: activePriceLabel,
            onRemove: () => setPrice('all'),
          },
        ]
      : []),
    ...(minRating > 0
      ? [
          {
            key: `rating-${minRating}`,
            label: `${minRating}★ & up`,
            onRemove: () => setRating(0),
          },
        ]
      : []),
    ...(categoryFilter !== 'all'
      ? [
          {
            key: `catfilter-${categoryFilter}`,
            label: categoryFilter,
            onRemove: () => setCategoryFilter('all'),
          },
        ]
      : []),
    ...(inStockOnly
      ? [
          {
            key: 'stock',
            label: 'In Stock',
            onRemove: () => setInStock(false),
          },
        ]
      : []),
  ]

  const bestSellerCount = books.filter((b) => b.badge === 'Best Seller').length

  const sidebar = (
    <FilterSidebar
      categories={categories}
      selectedCategories={selectedCategories}
      onToggleCategory={toggleCategory}
      priceRanges={priceRanges}
      priceRange={priceRange}
      onPriceRangeChange={(id) => {
        setCurrentPage(1)
        setPrice(id)
      }}
      minRating={minRating}
      onMinRatingChange={(value) => {
        setCurrentPage(1)
        setRating(value)
      }}
      inStockOnly={inStockOnly}
      onInStockChange={(value) => {
        setCurrentPage(1)
        setInStock(value)
      }}
      onClear={clearAll}
    />
  )

  return (
    <>
      <Navbar />
      <main className="shop-page">
        <Container>
          <div className="shop-hero-panel">
            <div className="shop-hero-copy">
              <p className="shop-eyebrow">Curated collection</p>
              <h1>Discover Your Next Favorite Read</h1>
              <p className="shop-hero-subtitle">
                Explore a hand-picked library — find books by title, author, or category and
                transform your reading journey today.
              </p>
              <div className="shop-hero-stats">
                <div className="shop-hero-stat">
                  <strong>{books.length}+</strong>
                  <span>Books</span>
                </div>
                <div className="shop-hero-stat">
                  <strong>{categories.length}</strong>
                  <span>Categories</span>
                </div>
                <div className="shop-hero-stat">
                  <strong>{bestSellerCount}+</strong>
                  <span>Bestsellers</span>
                </div>
              </div>
            </div>
            <div className="shop-hero-tools">
              <SearchBar value={searchValue} onChange={setSearch} />
              <div className="shop-hero-row">
                <label className="shop-hero-select">
                  <span>Category</span>
                  <div className="shop-sortbar">
                    <select
                      value={categoryFilter}
                      onChange={(event) => {
                        setCurrentPage(1)
                        setCategoryFilter(event.target.value)
                      }}
                    >
                      <option value="all">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <label className="shop-hero-select">
                  <span>Sort</span>
                  <SortDropdown value={sortOption} onChange={setSort} />
                </label>
              </div>
            </div>
          </div>

          <div className="shop-shell">
            {sidebar}

            <section>
              <div className="shop-toolbar">
                <div className="shop-toolbar-left">
                  <span className="shop-count-label">Showing</span>
                  <span className="shop-count-value">
                    {filteredBooks.length} of {books.length} books
                  </span>
                </div>
                <div className="shop-toolbar-right">
                  <button
                    type="button"
                    className="shop-filters-toggle"
                    onClick={() => setFilterOpen(true)}
                  >
                    Filters
                  </button>
                  <SortDropdown value={sortOption} onChange={setSort} />
                </div>
              </div>

              {activeFilters.length > 0 && (
                <div className="shop-chip-row">
                  {activeFilters.map((filter) => (
                    <button
                      key={filter.key}
                      type="button"
                      className="shop-chip"
                      onClick={filter.onRemove}
                    >
                      {filter.label} ×
                    </button>
                  ))}
                  <button type="button" className="shop-chip shop-chip-clear" onClick={clearAll}>
                    Clear All
                  </button>
                </div>
              )}

<ProductGrid
                products={paginatedBooks}
                loading={loading}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onQuickView={setSelectedBook}
                onResetFilters={clearAll}
              />

              {!loading && filteredBooks.length > 0 && (
                <Pagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={onChangePage}
                  pageSize={pageSize}
                  totalItems={filteredBooks.length}
                />
              )}
            </section>
          </div>
        </Container>
      </main>

      <div
        className={`shop-filter-backdrop ${filterOpen ? 'is-open' : ''}`}
        onClick={() => setFilterOpen(false)}
      />
      <div className={`shop-filter-drawer ${filterOpen ? 'is-open' : ''}`}>
        <div className="shop-filter-drawer-head">
          <h3>Filters</h3>
          <button
            type="button"
            className="shop-filter-close"
            onClick={() => setFilterOpen(false)}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>
{sidebar}
      </div>

      <Footer />
      <QuickViewModal
        product={selectedBook}
        isOpen={Boolean(selectedBook)}
        onClose={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedBook ? wishlist.includes(selectedBook.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Add-to-cart toast confirmation */}
      <div
        className={`shop-toast ${toast ? 'is-visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        <span className="shop-toast-icon">
          <FiCheckCircle size={20} />
        </span>
        {toast}
      </div>
    </>
  )
}

export default Shop
