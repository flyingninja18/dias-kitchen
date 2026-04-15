import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/lib/data-provider";

export interface CartItem {
  product: Product;
  variant: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, variant: string, price: number) => void;
  removeItem: (productId: string, variant: string) => void;
  updateQuantity: (productId: string, variant: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  orderId: string;
  lastWhatsAppTime: number;
  setLastWhatsAppTime: (t: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DK-${ts}-${rand}`;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderId] = useState(generateOrderId);
  const [lastWhatsAppTime, setLastWhatsAppTime] = useState(0);

  const addItem = useCallback((product: Product, variant: string, price: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.variant === variant);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.variant === variant
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, variant, price, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, variant: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.variant === variant)));
  }, []);

  const updateQuantity = useCallback((productId: string, variant: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId, variant);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.variant === variant ? { ...i, quantity: qty } : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, total, itemCount, orderId, lastWhatsAppTime, setLastWhatsAppTime }}>
      {children}
    </CartContext.Provider>
  );
};
