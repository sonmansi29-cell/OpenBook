import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("openbook-cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("openbook-cart", JSON.stringify(cartItems));
  }, [cartItems]);

const addToCart = (book, quantity = 1) => {
    const safeQty = Math.max(1, quantity);
    const exists = cartItems.find((item) => item.id === book.id);

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + safeQty }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...book, quantity: safeQty }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
