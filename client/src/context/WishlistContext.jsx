import { createContext, useContext, useEffect, useState } from "react";
import books from "../data/books";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("openbook-wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("openbook-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const clearWishlist = () => setWishlist([]);

  const isWishlisted = (id) => wishlist.includes(id);

  // Map saved IDs to full book objects (kept in storage order).
  const wishlistItems = wishlist
    .map((id) => books.find((book) => book.id === id))
    .filter(Boolean);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
