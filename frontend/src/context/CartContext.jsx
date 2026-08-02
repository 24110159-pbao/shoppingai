import { createContext, useContext, useState, useCallback, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Tối ưu hàm bằng useCallback để tránh render lại vô ích
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const exist = prevCart.find((item) => item.product.id === product.id);

      if (exist) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    // Ngăn chặn số lượng âm hoặc không hợp lệ
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  // Tối ưu giá trị Context bằng useMemo để tránh re-render các Component con
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [cart, addToCart, updateQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng bên trong một CartProvider");
  }
  return context;
};
