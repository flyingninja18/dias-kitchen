import { Link } from "react-router-dom";
import { brands, products } from "@/data/products";

const Brands = () => {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-[1000px] mx-auto px-6">
        <p className="text-xs uppercase tracking-[3px] text-muted-foreground font-body mb-2 text-center">Our Partners</p>
        <h1 className="font-display text-4xl text-center mb-16">Brand Universe</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand) => {
            const count = products.filter((p) => p.brand === brand).length;
            return (
              <Link
                key={brand}
                to={`/brands/${brand.toLowerCase()}`}
                className="group border border-border rounded-lg p-8 flex flex-col items-center justify-center hover:border-foreground transition-colors no-underline aspect-square"
              >
                <span className="font-display text-2xl text-foreground group-hover:text-gold transition-colors">{brand}</span>
                <span className="font-body text-xs text-muted-foreground mt-2">{count} products</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Brands;
