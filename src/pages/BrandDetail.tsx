import { useParams, Link } from "react-router-dom";
import { products, brands } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const BrandDetail = () => {
  const { slug } = useParams();
  const brandName = brands.find((b) => b.toLowerCase() === slug);
  const brandProducts = products.filter((p) => p.brand.toLowerCase() === slug);

  if (!brandName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Brand not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <Link to="/brands" className="font-body text-xs text-muted-foreground hover:text-foreground no-underline">
          ← All Brands
        </Link>
        <h1 className="font-display text-4xl mt-4 mb-12">{brandName}</h1>

        {brandProducts.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm py-20 text-center">No products available for this brand yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDetail;
