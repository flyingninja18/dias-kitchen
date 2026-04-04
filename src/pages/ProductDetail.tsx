import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Heart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Product not found.</p>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const displayPrice = product.onOffer
    ? Math.round(variant.price * (1 - product.discountPercent / 100))
    : variant.price;

  return (
    <div className="min-h-screen pt-16">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-[1.2] bg-secondary flex items-center justify-center md:sticky md:top-0 md:h-screen p-12"
        >
          <img src={product.image} alt={product.name} className="max-w-[75%] h-auto" />
        </motion.section>

        {/* Info */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex-1 p-8 md:p-16 md:pt-24 overflow-y-auto"
        >
          <p className="font-body text-[11px] uppercase tracking-[2px] text-muted-foreground mb-6">
            {product.brand}
          </p>

          <h1 className="font-display text-3xl md:text-4xl leading-tight mb-5 tracking-tight">{product.name}</h1>

          <div className="flex items-center gap-3 mb-8">
            <span className="font-body text-2xl text-foreground font-semibold tracking-tight">₹{displayPrice.toLocaleString("en-IN")}</span>
            {product.onOffer && (
              <>
                <span className="font-body text-lg text-muted-foreground line-through">₹{variant.price.toLocaleString("en-IN")}</span>
                <span className="bg-foreground text-background text-[10px] font-body font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
                  –{product.discountPercent}%
                </span>
              </>
            )}
          </div>

          <p className="font-body text-[14px] leading-relaxed text-muted-foreground mb-10">{product.description}</p>

          {/* Variant Selector */}
          {product.variants.length > 1 && (
            <div className="mb-8">
              <p className="font-body text-[11px] uppercase tracking-[2px] text-muted-foreground mb-3">Size</p>
              <div className="flex gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.size}
                    onClick={() => setSelectedVariant(i)}
                    className={`px-5 py-2.5 border rounded-xl font-body text-[13px] cursor-pointer transition-all duration-200 ${
                      i === selectedVariant
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          <div className="mb-10 space-y-0">
            {[
              ["Material", product.material],
              ["Compatibility", product.compatibility],
              ["Warranty", product.warranty],
              ["Stock", variant.stock > 0 ? `${variant.stock} units` : "Out of stock"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-3.5 border-b border-border">
                <span className="font-body text-[12px] font-semibold uppercase tracking-[1px] text-muted-foreground">{label}</span>
                <span className="font-body text-[13px] text-foreground">{value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => variant.stock > 0 && addItem(product, variant.size, displayPrice)}
              disabled={variant.stock === 0}
              className="flex-[2] bg-foreground text-background py-4 rounded-xl font-body text-[12px] tracking-[1.5px] uppercase font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={16} />
              {variant.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
            <button className="w-12 h-12 border border-border bg-card rounded-xl flex items-center justify-center cursor-pointer hover:bg-secondary transition-colors">
              <Heart size={18} className="text-foreground" />
            </button>
          </div>

          <Link to="/category" className="block mt-10 text-center font-body text-[12px] text-muted-foreground hover:text-foreground no-underline transition-colors">
            ← Back to Collection
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default ProductDetail;
