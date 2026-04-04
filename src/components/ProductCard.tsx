import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const baseVariant = product.variants[0];
  const displayPrice = product.onOffer
    ? Math.round(baseVariant.price * (1 - product.discountPercent / 100))
    : baseVariant.price;

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`} className="block no-underline">
        <div className="relative aspect-square bg-secondary rounded overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.onOffer && (
            <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-body font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
              –{product.discountPercent}%
            </span>
          )}
          <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product, baseVariant.size, displayPrice);
              }}
              className="w-full bg-primary text-primary-foreground text-center py-3 font-body text-xs tracking-widest uppercase font-medium cursor-pointer"
            >
              Quick Add
            </button>
          </div>
        </div>
      </Link>
      <div className="pt-3">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="no-underline">
          <h3 className="font-display text-base font-semibold text-foreground mt-1 leading-snug">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-body text-sm text-gold font-medium">₹{displayPrice.toLocaleString("en-IN")}</span>
          {product.onOffer && (
            <span className="font-body text-xs text-muted-foreground line-through">₹{baseVariant.price.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
