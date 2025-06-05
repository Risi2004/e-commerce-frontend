
import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const areItemsEqual = (a, b) => {
    return (
      a.id === b.id &&
      a.type === b.type &&
      a.name === b.name &&
      a.brand === b.brand &&
      JSON.stringify(a.specs || {}) === JSON.stringify(b.specs || {}) // optional
    );
  };

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => areItemsEqual(item, newItem));

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (id, type, name, brand) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id &&
        item.type === type &&
        item.name === name &&
        item.brand === brand
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id, type, name, brand) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (
            item.id === id &&
            item.type === type &&
            item.name === name &&
            item.brand === brand
          ) {
            return item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id, type, name, brand) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.type === type &&
            item.name === name &&
            item.brand === brand
          )
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
