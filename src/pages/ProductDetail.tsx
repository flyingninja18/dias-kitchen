import { useParams, Link } from "react-router-dom";
import { useState } from "react";
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
    <div className="min-h-screen pt-20">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <section className="flex-[1.2] bg-secondary flex items-center justify-center md:sticky md:top-0 md:h-screen p-8">
          <img src={product.image} alt={product.name} className="max-w-[80%] h-auto" />
        </section>

        {/* Info */}
        <section className="flex-1 p-8 md:p-16 md:pt-20 overflow-y-auto">
          <p className="font-body text-[11px] uppercase tracking-[2px] text-muted-foreground mb-5">
            {product.category} / {product.subcategory}
          </p>

          <h1 className="font-display text-4xl leading-tight mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-8">
            <span className="font-body text-2xl text-gold font-medium">₹{displayPrice.toLocaleString("en-IN")}</span>
            {product.onOffer && (
              <>
                <span className="font-body text-lg text-muted-foreground line-through">₹{variant.price.toLocaleString("en-IN")}</span>
                <span className="bg-foreground text-background text-[10px] font-body font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
                  –{product.discountPercent}%
                </span>
              </>
            )}
          </div>

          <p className="font-body text-[15px] leading-relaxed text-muted-foreground mb-10">{product.description}</p>

          {/* Variant Selector */}
          {product.variants.length > 1 && (
            <div className="mb-8">
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">Size</p>
              <div className="flex gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.size}
                    onClick={() => setSelectedVariant(i)}
                    className={`px-4 py-2 border rounded font-body text-sm cursor-pointer transition-colors ${
                      i === selectedVariant
                        ? "border-foreground bg-primary text-primary-foreground"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          <table className="w-full mb-10 font-body">
            <tbody>
              {[
                ["Material", product.material],
                ["Compatibility", product.compatibility],
                ["Warranty", product.warranty],
                ["Stock", variant.stock > 0 ? `${variant.stock} units` : "Out of stock"],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-border">
                  <td className="py-4 text-sm font-semibold uppercase tracking-wider w-[40%]">{label}</td>
                  <td className="py-4 text-sm text-muted-foreground">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => variant.stock > 0 && addItem(product, variant.size, displayPrice)}
              disabled={variant.stock === 0}
              className="flex-[2] bg-primary text-primary-foreground py-5 font-body text-xs tracking-[2px] uppercase font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={16} />
              {variant.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
            <button className="flex-[0.3] border border-border bg-card flex items-center justify-center cursor-pointer hover:bg-secondary transition-colors">
              <Heart size={18} />
            </button>
          </div>

          <Link to="/category" className="block mt-8 text-center font-body text-xs text-muted-foreground hover:text-foreground no-underline">
            ← Back to Collection
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
