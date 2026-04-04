import { X, Minus, Plus, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const itemLines = items.map(
      (item, i) => `${i + 1}. ${item.product.name} (${item.variant}) × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
    );

    const message = encodeURIComponent(
      `Hello Dias Kitchen! I'd like to order:\n\n${itemLines.join("\n")}\n\nTotal: ₹${total.toLocaleString("en-IN")}\n\nPlease confirm availability.`
    );

    window.open(`https://wa.me/919999999999?text=${message}`, "_blank");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50" onClick={() => setIsOpen(false)} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-display text-xl">Your Cart</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors cursor-pointer">
            <X size={20} />
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
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.variant}`} className="flex gap-4 py-4 border-b border-border last:border-0">
                  <div className="w-20 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{item.variant}</p>
                    <p className="text-gold font-body text-sm font-medium mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.variant, item.quantity - 1)}
                        className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-secondary cursor-pointer"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)}
                        className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-secondary cursor-pointer"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id, item.variant)}
                        className="ml-auto text-muted-foreground hover:text-destructive text-xs cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-xl">₹{total.toLocaleString("en-IN")}</span>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-primary text-primary-foreground py-4 font-body text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <MessageCircle size={16} />
              Order via WhatsApp
            </button>
            <button
              onClick={clearCart}
              className="w-full text-center text-muted-foreground text-xs hover:text-foreground cursor-pointer py-1"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const ShoppingBagIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/40">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default CartDrawer;
