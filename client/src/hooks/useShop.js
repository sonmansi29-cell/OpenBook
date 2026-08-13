import { useMemo } from 'react'

function useShop(books, searchValue, selectedCategories, categoryFilter, priceRange, minRating, inStockOnly, sortOption) {
  return useMemo(() => {
    const query = searchValue.trim().toLowerCase()

    let result = books.filter((book) => {
      const matchesQuery =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(book.category)

      const matchesCategoryFilter = categoryFilter === 'all' || book.category === categoryFilter

      const range = {
        all: { min: 0, max: Infinity },
        '0-500': { min: 0, max: 500 },
        '500-1000': { min: 500, max: 1000 },
        '1000-plus': { min: 1000, max: Infinity },
      }[priceRange] || { min: 0, max: Infinity }

      const matchesPrice = book.price >= range.min && book.price < range.max
      const matchesRating = book.rating >= minRating
      const matchesStock = !inStockOnly || book.stock > 0

      return matchesQuery && matchesCategory && matchesCategoryFilter && matchesPrice && matchesRating && matchesStock
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
  }, [books, searchValue, selectedCategories, categoryFilter, priceRange, minRating, inStockOnly, sortOption])
}

export default useShop
