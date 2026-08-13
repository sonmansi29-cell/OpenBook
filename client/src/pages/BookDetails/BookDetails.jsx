import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaCartPlus, FaMinus, FaPlus, FaBolt, FaEye, FaCheckCircle } from 'react-icons/fa'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import { RatingStars } from '../../components/books/Rating'
import books, { badgeColors } from '../../data/books'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import useRequireAuth from '../../hooks/useRequireAuth'

import './BookDetails.css'

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    rating: 5,
    date: '12 Jan 2025',
    text: 'Absolutely loved this book! The writing is immersive and the story kept me hooked from the first page. Highly recommend it.',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    rating: 4,
    date: '28 Dec 2024',
    text: 'Great read overall. A few slow parts in the middle, but the ending was worth it. Delivery was fast too.',
  },
  {
    id: 3,
    name: 'Ananya Iyer',
    rating: 5,
    date: '15 Nov 2024',
    text: 'One of the best books I have read this year. The characters feel real and the themes resonate deeply.',
  },
]

function BookDetails() {
const { id } = useParams()
  const book = books.find((b) => b.id === id || b.id === Number(id)) || books[0]

  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [zoom, setZoom] = useState(false)

  const navigate = useNavigate()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { requireAuth } = useRequireAuth()

  // Wishlist state now comes from the shared WishlistContext (survives
  // reloads, stays in sync with the navbar badge) instead of local state.
  const wishlisted = isWishlisted(book.id)

  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : null

  const badgeColor = badgeColors[book.badge] || '#6B7A58'

  const gallery = [
    book.image,
    book.image,
    book.image,
  ]

  const relatedBooks = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4)

// Gated add-to-cart: logged-out users are redirected to /login and the cart
  // add is replayed automatically after they sign in.
  const handleAddToCart = () => {
    if (!requireAuth({ type: 'cart', book, quantity })) return
    addToCart(book, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  // Gated wishlist toggle.
  const handleToggleWishlist = () => {
    if (!requireAuth({ type: 'wishlist', bookId: book.id })) return
    toggleWishlist(book.id)
  }

  // Gated Buy Now: logged-out users are redirected to /login; after login the
  // pending checkout carries them straight to /checkout (see Login page).
  const handleBuyNow = () => {
    if (!requireAuth({ type: 'checkout', to: '/checkout' })) return
    navigate('/checkout')
  }

  const increment = () => setQuantity((q) => Math.min(q + 1, book.stock || 10))
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1))

  return (
    <>
      <Navbar />
      <main className="bookdetails-page">
        <Container>
          {/* Breadcrumb */}
          <nav className="bookdetails-breadcrumb">
            <Link to="/">Home</Link> <span>/</span>
            <Link to="/shop">Shop</Link> <span>/</span>
            <span className="bookdetails-breadcrumb-current">{book.title}</span>
          </nav>

          <div className="bookdetails-layout">
            {/* Image gallery */}
            <div className="bookdetails-gallery">
              <div
                className={`bookdetails-main-image ${zoom ? 'is-zoomed' : ''}`}
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
              >
                <img src={gallery[activeImage]} alt={book.title} />
                {book.badge && (
                  <span className="bookdetails-badge" style={{ background: badgeColor }}>
                    {book.badge}
                  </span>
                )}
                {discount && <span className="bookdetails-discount">{discount}% OFF</span>}
              </div>
              <div className="bookdetails-thumbnails">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    className={`bookdetails-thumb ${index === activeImage ? 'is-active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img} alt={`${book.title} ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bookdetails-info">
              <p className="bookdetails-category">{book.category}</p>
              <h1 className="bookdetails-title">{book.title}</h1>
              <p className="bookdetails-author">by {book.author}</p>

              <div className="bookdetails-rating-row">
                <RatingStars rating={book.rating} size={16} />
                <span className="bookdetails-rating-value">{book.rating.toFixed(1)}</span>
                <span className="bookdetails-rating-count">(128 reviews)</span>
              </div>

              <div className="bookdetails-price-row">
                <span className="bookdetails-price">₹{book.price}</span>
                {book.originalPrice && (
                  <span className="bookdetails-original-price">₹{book.originalPrice}</span>
                )}
                {discount && <span className="bookdetails-save">Save {discount}%</span>}
              </div>

              <p className="bookdetails-description">{book.description}</p>

              <div className="bookdetails-meta-grid">
                <div className="bookdetails-meta-item">
                  <span className="bookdetails-meta-label">Publisher</span>
                  <span className="bookdetails-meta-value">{book.publisher}</span>
                </div>
                <div className="bookdetails-meta-item">
                  <span className="bookdetails-meta-label">Language</span>
                  <span className="bookdetails-meta-value">{book.language}</span>
                </div>
                <div className="bookdetails-meta-item">
                  <span className="bookdetails-meta-label">ISBN</span>
                  <span className="bookdetails-meta-value">{book.isbn}</span>
                </div>
                <div className="bookdetails-meta-item">
                  <span className="bookdetails-meta-label">Pages</span>
                  <span className="bookdetails-meta-value">{book.pages}</span>
                </div>
              </div>

              <div className="bookdetails-availability">
                {book.stock > 0 ? (
                  <>
                    <FaCheckCircle className="bookdetails-in-stock-icon" /> In Stock ({book.stock} available)
                  </>
                ) : (
                  <span className="bookdetails-out-of-stock">Out of Stock</span>
                )}
              </div>

              <div className="bookdetails-actions">
                <div className="bookdetails-qty">
                  <button onClick={decrement} aria-label="Decrease quantity"><FaMinus /></button>
                  <span>{quantity}</span>
                  <button onClick={increment} aria-label="Increase quantity"><FaPlus /></button>
                </div>

                <button
                  className={`bookdetails-atc ${added ? 'is-added' : ''}`}
                  onClick={handleAddToCart}
                  disabled={book.stock === 0}
                >
                  {added ? (
                    <><FaCheckCircle /> Added ✓</>
                  ) : (
                    <><FaCartPlus /> Add to Cart</>
                  )}
                </button>

<button
                  className="bookdetails-buynow"
                  onClick={handleBuyNow}
                  disabled={book.stock === 0}
                >
                  <FaBolt /> Buy Now
                </button>

                <button
                  className={`bookdetails-wishlist ${wishlisted ? 'is-active' : ''}`}
                  onClick={handleToggleWishlist}
                  aria-label="Toggle wishlist"
                >
                  {wishlisted ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          </div>

          {/* Description section */}
          <section className="bookdetails-section">
            <h2 className="bookdetails-section-title">About this book</h2>
            <p className="bookdetails-section-text">{book.description}</p>
            <p className="bookdetails-section-text">
              This edition is published by {book.publisher}. Available in {book.language}.
              A must-read for {book.category} enthusiasts, drawing on the author's celebrated
              storytelling and decades of craft.
            </p>
          </section>

          {/* Related books */}
          {relatedBooks.length > 0 && (
            <section className="bookdetails-section">
              <div className="bookdetails-section-header">
                <h2 className="bookdetails-section-title">Related Books</h2>
                <Link to="/shop" className="bookdetails-view-all">View All →</Link>
              </div>
              <div className="bookdetails-carousel">
                {relatedBooks.map((rel) => (
                  <Link to={`/book/${rel.id}`} key={rel.id} className="bookdetails-related-card">
                    <img src={rel.image} alt={rel.title} />
                    <h4>{rel.title}</h4>
                    <p>{rel.author}</p>
                    <span className="bookdetails-related-price">₹{rel.price}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section className="bookdetails-section">
            <div className="bookdetails-section-header">
              <h2 className="bookdetails-section-title">Customer Reviews</h2>
              <span className="bookdetails-review-summary">
                <RatingStars rating={book.rating} size={14} /> {book.rating.toFixed(1)} · 128 reviews
              </span>
            </div>
            <div className="bookdetails-reviews">
              {reviews.map((review) => (
                <div key={review.id} className="bookdetails-review">
                  <div className="bookdetails-review-head">
                    <div className="bookdetails-review-avatar">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="bookdetails-review-name">{review.name}</p>
                      <p className="bookdetails-review-date">{review.date}</p>
                    </div>
                  </div>
                  <RatingStars rating={review.rating} size={13} />
                  <p className="bookdetails-review-text">{review.text}</p>
                </div>
              ))}
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default BookDetails
