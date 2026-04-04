import { X, Minus, Plus, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, clearCart } = useCart();
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const itemLines = items.map(
      (item, i) => `${i + 1}. ${item.product.name} (${item.variant}) × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
    );

    let message = `Hello Dias Kitchen! I'd like to order:\n\n${itemLines.join("\n")}\n\nTotal: ₹${total.toLocaleString("en-IN")}`;
    if (specialInstructions.trim()) {
      message += `\n\nSpecial Instructions: ${specialInstructions.trim()}`;
    }
    message += "\n\nPlease confirm availability.";

    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/15 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] z-50 glass-surface shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-display text-lg tracking-tight">Cart</h2>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingBagIcon />
                  <p className="mt-4 font-body text-sm">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.variant}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4 py-5 border-b border-border last:border-0"
                    >
                      <div className="w-[72px] h-[72px] bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-medium truncate tracking-tight">{item.product.name}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{item.variant}</p>
                        <p className="text-foreground font-body text-sm font-semibold mt-1">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                        <div className="flex items-center gap-2 mt-2.5">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-secondary cursor-pointer transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-secondary cursor-pointer transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.variant)}
                            className="ml-auto text-muted-foreground hover:text-destructive text-[11px] cursor-pointer transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Special instructions (optional)"
                  rows={2}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 font-body text-xs text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-foreground/20"
                />
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-muted-foreground">Total</span>
                  <span className="font-display text-xl tracking-tight">₹{total.toLocaleString("en-IN")}</span>
                </div>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-foreground text-background py-4 rounded-xl font-body text-[12px] font-semibold tracking-[1.5px] uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <MessageCircle size={15} />
                  Order via WhatsApp
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-muted-foreground text-[11px] hover:text-foreground cursor-pointer py-1 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ShoppingBagIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/30">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default CartDrawer;
