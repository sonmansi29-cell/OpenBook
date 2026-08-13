import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FiSearch, FiShoppingBag } from 'react-icons/fi'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import ProductCard from '../../components/shop/ProductCard'
import SearchBar from '../../components/shop/SearchBar'

import books from '../../data/books'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'

/**
 * SearchResults
 * -------------
 * Displays books matching the `?q=` search query. The navbar search input
 * submits to `/search?q=...`, and this page filters the static books data
 * (same data + card components used across the rest of the site).
 */
function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = (searchParams.get('q') || '').trim()

  const { wishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  // Case-insensitive search against title, author and category.
  const results = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return []
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q),
    )
  }, [query])

  const handleQueryChange = (value) => {
    setSearchParams(value.trim() ? { q: value.trim() } : {}, { replace: true })
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#F8F5EF] py-16 sm:py-24">
        <Container>
          <SectionHeading
            subtitle={query ? 'Search Results' : 'Search'}
            title={query ? `Results for "${query}"` : 'Find your next read'}
          />

          {/* Search box that stays in sync with the URL query param */}
          <div className="mx-auto mb-12 max-w-2xl">
            <SearchBar value={query} onChange={handleQueryChange} />
          </div>

          {!query ? (
            /* ----- Empty prompt state ----- */
            <div className="mx-auto max-w-md rounded-[24px] bg-white p-10 text-center shadow-lg ring-1 ring-[#E8E0CF]">
              <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#F3EFE6] text-[#6B7A58]">
                <FiSearch size={28} />
              </span>
              <h3 className="text-xl font-bold text-[#2F2F2F]">
                Type something to start searching
              </h3>
              <p className="mt-2 text-sm text-[#5C5A52]">
                Search by book title, author or category — for example “habits”, “James Clear” or
                “Fiction”.
              </p>
            </div>
          ) : results.length === 0 ? (
            /* ----- No matches state ----- */
            <div className="mx-auto max-w-md rounded-[24px] bg-white p-10 text-center shadow-lg ring-1 ring-[#E8E0CF]">
              <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#F3EFE6] text-[#6B7A58]">
                <FiSearch size={28} />
              </span>
              <h3 className="text-xl font-bold text-[#2F2F2F]">No books found</h3>
              <p className="mt-2 text-sm text-[#5C5A52]">
                We couldn’t find anything matching “{query}”. Try a different keyword or browse all
                books.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#6B7A58] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#556248]"
              >
                <FiShoppingBag size={16} />
                Browse All Books
              </Link>
            </div>
          ) : (
            /* ----- Matches grid using the same ProductCard as Shop ----- */
            <>
              <p className="mb-6 text-center text-sm font-semibold text-[#5C5A52]">
                {results.length} {results.length === 1 ? 'book' : 'books'} found
              </p>
              <div className="shop-grid">
                {results.map((product) => (
                  <div key={product.id} className="shop-card-frame">
                    <ProductCard
                      product={product}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={toggleWishlist}
                      onAddToCart={addToCart}
                      onQuickView={() => {}}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default SearchResults

