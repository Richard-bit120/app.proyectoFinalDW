// src/contexts/CartContext.jsx
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado obligatorio para el carrito (useState)
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Cada vez que el carrito cambie, recalculamos el total de la compra
  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  // Función obligatoria: agregarProducto
  const agregarProducto = (product, quantity = 1) => {
    setCart((prevCart) => {
      // Verificamos si el producto ya está en el carrito
      const itemIndex = prevCart.findIndex((item) => item.product.id === product.id);

      if (itemIndex >= 0) {
        // Si ya existe, clonamos el array y sumamos la cantidad
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += quantity;
        return newCart;
      } else {
        // Si es nuevo, lo agregamos a la lista
        return [...prevCart, { product, quantity }];
      }
    });
  };

  // Función obligatoria: eliminarProducto
  const eliminarProducto = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Función obligatoria: vaciarCarrito
  const vaciarCarrito = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, total, agregarProducto, eliminarProducto, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};