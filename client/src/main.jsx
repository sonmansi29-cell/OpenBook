import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  </AuthProvider>,
)
