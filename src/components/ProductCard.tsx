import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const { addItem } = useCart();
  const baseVariant = product.variants[0];
  const displayPrice = product.onOffer
    ? Math.round(baseVariant.price * (1 - product.discountPercent / 100))
    : baseVariant.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative ${featured ? "row-span-2" : ""}`}
    >
      <Link to={`/product/${product.id}`} className="block no-underline">
        <div className={`relative bg-secondary rounded-2xl overflow-hidden ${featured ? "aspect-[3/4]" : "aspect-square"}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {product.onOffer && (
            <span className="absolute top-4 left-4 bg-foreground/90 text-background text-[10px] font-body font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">
              –{product.discountPercent}%
            </span>
          )}
          <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product, baseVariant.size, displayPrice);
              }}
              className="w-full bg-foreground/90 backdrop-blur-sm text-background text-center py-3.5 font-body text-[11px] tracking-[1.5px] uppercase font-medium cursor-pointer transition-colors hover:bg-foreground"
            >
              Quick Add — ₹{displayPrice.toLocaleString("en-IN")}
            </button>
          </div>
        </div>
      </Link>
      <div className="pt-4 px-0.5">
        <p className="text-[10px] uppercase tracking-[2px] text-muted-foreground font-body">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="no-underline">
          <h3 className="font-display text-base font-semibold text-foreground mt-1 leading-snug tracking-tight">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-body text-sm text-foreground font-medium">₹{displayPrice.toLocaleString("en-IN")}</span>
          {product.onOffer && (
            <span className="font-body text-xs text-muted-foreground line-through">₹{baseVariant.price.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
