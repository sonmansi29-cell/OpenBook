import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import CollectionDetail from './pages/CollectionDetail/CollectionDetail'
import Collections from './pages/Collections/Collections'
import About from './pages/About/About'
import Blog from './pages/Blog/Blog'
import BlogPostDetail from './pages/Blog/BlogPostDetail'
import Contact from './pages/Contact/Contact'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Cart from './pages/Cart/Cart'
import Wishlist from './pages/Wishlist/Wishlist'
import Profile from './pages/Profile/Profile'
import Dashboard from './pages/Admin/Dashboard'
import BookDetails from './pages/BookDetails/BookDetails'
import SearchResults from './pages/SearchResults/SearchResults'
import Orders from './pages/Orders/Orders'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/collections/:slug" element={<CollectionDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPostDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  )
}

export default App
