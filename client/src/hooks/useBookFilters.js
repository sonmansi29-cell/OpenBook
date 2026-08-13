import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * Price ranges used by the sidebar filter (radio group).
 * `id` is used in state + URL query params (`price=0-500`).
 */
export const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: '0-500', label: '₹0-500', min: 0, max: 500 },
  { id: '500-1000', label: '₹500-1000', min: 500, max: 1000 },
  { id: '1000-plus', label: '₹1000+', min: 1000, max: Infinity },
]

/**
 * Sorting options mirrored in <SortDropdown />. Treated as a single source of truth
 * for the switch below.
 */
export const SORT_OPTIONS = ['best-selling', 'newest', 'price-asc', 'price-desc', 'rating', 'az', 'za']

/**
 * useBookFilters
 * --------------
 * Single source of truth for the Shop page's filtering/sorting behaviour.
 *
 * State is kept in React state but synced to the URL query string so a filtered
 * view is shareable, bookmarkable and survives a refresh (e.g.
 * `/shop?category=fiction,horror&price=0-500&rating=4&stock=1&sort=price-asc&q=the`).
 *
 * The derived list is computed with `useMemo` — the master `books` array is never
 * mutated; we always build a fresh filtered copy.
 */
export default function useBookFilters(books) {
  // ---- URL is the source of truth for the "loaded" state (refresh/bookmark) ----
  const [searchParams, setSearchParams] = useSearchParams()

  // Widgets that only make sense on the Shop page (not surfaced in the URL) live
  // purely in component state:
  //   - searchValue: string   (tied to the hero search box)
  //   - categoryFilter: 'all' | string (the secondary "Category" dropdown in the hero)

  // Categories use OR logic (show books matching ANY checked category).
  const selectedCategories = useMemo(
    () => (searchParams.get('category') || '').split(',').filter(Boolean),
    [searchParams],
  )

  // A single price bracket is active at a time (radio group).
  const priceRange = searchParams.get('price') || 'all'

  // Minimum rating (0 == "Any Rating").
  const minRating = Number(searchParams.get('rating') || 0)

  // Availability toggle.
  const inStockOnly = searchParams.get('stock') === '1'

  // Sort order.
  const sortOption = searchParams.get('sort') || 'newest'

  // Local-only state (not part of the URL).
  // searchValue handled in Shop component and passed in; we keep it here for clarity.
  // We derive from searchParams for everything shareable.

  const updateParams = (patch) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      Object.entries(patch).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '' || value === 'all' || value === 0) {
          next.delete(key)
        } else {
          next.set(key, String(value))
        }
      })
      return next
    })
  }

  /**
   * Toggle a category checkbox (OR logic). Removing a category just drops it from
   * the comma-separated list.
   */
  const toggleCategory = (category) => {
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]
    updateParams({ category: next.join(',') })
  }

  const setPrice = (id) => updateParams({ price: id })
  const setRating = (value) => updateParams({ rating: value })
  const setInStock = (value) => updateParams({ stock: value ? 1 : null })
  const setSort = (value) => updateParams({ sort: value === 'newest' ? null : value })
  const setSearch = (value) => updateParams({ q: value || null })
  const setCategoryFilter = (value) => updateParams({ cat: value === 'all' ? null : value })

  /** Reset every filter/sort/search back to defaults. */
  const clearAll = () => {
    updateParams({ category: '', price: 'all', rating: 0, stock: null, sort: null, q: null, cat: null })
  }

  /**
   * Master filter + sort pipeline.
   * IMPORTANT: operates on a shallow copy (`books.filter`) so the original
   * master array is never mutated. Each group is AND-ed with the others.
   */
  const filteredBooks = useMemo(() => {
    const query = searchParams.get('q')?.trim().toLowerCase() || ''

    let result = books.filter((book) => {
      // Search across title, author and category.
      const matchesSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)

      // Secondary category dropdown (AND with the checkbox group, not OR).
      const selectedCat = searchParams.get('cat')
      const matchesCategoryDropdown = !selectedCat || book.category === selectedCat

      // Category checkboxes: OR logic — matches if ANY checked category applies.
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(book.category)

      // Price bracket.
      const range = PRICE_RANGES.find((r) => r.id === priceRange) || PRICE_RANGES[0]
      const matchesPrice = book.price >= range.min && book.price < range.max

      // Minimum rating.
      const matchesRating = book.rating >= minRating

      // In-stock only.
      const matchesStock = !inStockOnly || book.stock > 0

      return (
        matchesSearch &&
        matchesCategoryDropdown &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesStock
      )
    })

    switch (sortOption) {
      case 'best-selling':
        result.sort((a, b) => (b.sales || 0) - (a.sales || 0))
        break
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    }

    return result
  }, [books, searchParams, selectedCategories, priceRange, minRating, inStockOnly, sortOption])

  return {
    // State (shareable, URL-backed)
    searchValue: searchParams.get('q') || '',
    selectedCategories,
    categoryFilter: searchParams.get('cat') || 'all',
    priceRange,
    minRating,
    inStockOnly,
    sortOption,
    // Actions
    toggleCategory,
    setPrice,
    setRating,
    setInStock,
    setSort,
    setSearch,
    setCategoryFilter,
    setClear: clearAll,
    clearAll,
    // Derived
    filteredBooks,
  }
}

