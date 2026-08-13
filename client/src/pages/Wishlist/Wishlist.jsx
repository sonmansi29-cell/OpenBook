import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiTrash2, FiCheck } from 'react-icons/fi'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import useRequireAuth from '../../hooks/useRequireAuth'

import './Wishlist.css'

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { requireAuth } = useRequireAuth()
  const [addedId, setAddedId] = useState(null)

  const count = wishlistItems.length

  // Gated add-to-cart: logged-out users are redirected to /login and the cart
  // add is replayed automatically after they sign in (see Login page).
  const handleAddToCart = (book) => {
    if (!requireAuth({ type: 'cart', book })) return
    addToCart(book)
    setAddedId(book.id)
    setTimeout(() => setAddedId(null), 1600)
  }

  // Gated move-all-to-cart: requires a single login then adds every item.
  const handleMoveAllToCart = () => {
    if (!requireAuth({ type: 'cart' })) return
    wishlistItems.forEach((book) => addToCart(book))
  }

  return (
    <>
      <Navbar />
      <main className="wishlist-page">
        <Container>
          <SectionHeading subtitle="Wishlist" title="Your saved books" />

          {count === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">
                <FiHeart />
              </div>
              <h3>Your wishlist is empty</h3>
              <p>Tap the heart on any book to save it here for later.</p>
              <Link to="/shop" className="wishlist-empty-cta">
                <FiShoppingBag size={18} />
                Browse Books
              </Link>
            </div>
          ) : (
            <>
              <div className="wishlist-bar">
                <div className="wishlist-bar-info">
                  <span className="wishlist-count-label">{count} saved</span>
                  <span className="wishlist-count-sep">·</span>
                  <span className="wishlist-count-note">
                    {count === 1 ? 'book' : 'books'} in your wishlist
                  </span>
                </div>
                <div className="wishlist-bar-actions">
                  <button
                    type="button"
                    className="wishlist-bar-btn"
                    onClick={handleMoveAllToCart}
                  >
                    <FiShoppingBag size={16} />
                    Move All to Cart
                  </button>
                  <button
                    type="button"
                    className="wishlist-bar-btn wishlist-bar-btn-danger"
                    onClick={clearWishlist}
                  >
                    <FiTrash2 size={16} />
                    Clear Wishlist
                  </button>
                </div>
              </div>

              <div className="wishlist-grid">
                {wishlistItems.map((book) => {
                  const discount = book.originalPrice
                    ? Math.round(
                        ((book.originalPrice - book.price) / book.originalPrice) * 100,
                      )
                    : 0

                  const added = addedId === book.id

                  return (
                    <article key={book.id} className="wishlist-card">
                      <div className="wishlist-card-image-wrap">
                        <img
                          className="wishlist-card-image"
                          src={book.image}
                          alt={book.title}
                        />
                        {discount > 0 && (
                          <span className="wishlist-discount">-{discount}%</span>
                        )}
                        <button
                          type="button"
                          className="wishlist-remove"
                          onClick={() => removeFromWishlist(book.id)}
                          aria-label={`Remove ${book.title} from wishlist`}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>

                      <div className="wishlist-card-body">
                        <h3 className="wishlist-card-title">{book.title}</h3>
                        <p className="wishlist-card-author">{book.author}</p>
                        <p className="wishlist-card-category">{book.category}</p>

                        <div className="wishlist-card-price-row">
                          <span className="wishlist-price">₹{book.price}</span>
                          {book.originalPrice && (
                            <span className="wishlist-original-price">
                              ₹{book.originalPrice}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          className={`wishlist-add ${added ? 'is-added' : ''}`}
                          onClick={() => handleAddToCart(book)}
                        >
                          {added ? (
                            <>
                              <FiCheck size={16} />
                              Added to Cart
                            </>
                          ) : (
                            <>
                              <FiShoppingBag size={16} />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default Wishlist
