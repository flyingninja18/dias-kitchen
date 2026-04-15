import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBrandProducts, useBrands } from "@/hooks/use-products";
import ProductCard from "@/components/ProductCard";

const BrandDetail = () => {
  const { slug } = useParams();
  const { data: brands = [] } = useBrands();
  const { data: brandProducts = [], isLoading } = useBrandProducts(slug);

  const brandName = brands.find((b) => b.toLowerCase() === slug);

  if (!isLoading && !brandName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Brand not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-[1320px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16">
          <Link to="/brands" className="font-body text-[11px] text-muted-foreground hover:text-foreground no-underline tracking-[1px] uppercase">← All Brands</Link>
          <h1 className="font-display text-5xl md:text-6xl mt-6 mb-4 tracking-tight">{brandName || slug}</h1>
          <p className="font-body text-muted-foreground text-[15px] max-w-lg">
            Explore the complete {brandName || slug} collection — trusted by millions of Indian households.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {[...Array(3)].map((_, i) => <div key={i} className="bg-secondary rounded-2xl aspect-square animate-pulse" />)}
          </div>
        ) : brandProducts.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm py-20 text-center">No products available for this brand yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {brandProducts.map((p, i) => (
              <div key={p.id} className={i === 0 ? "md:row-span-2" : ""}>
                <ProductCard product={p} featured={i === 0} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDetail;
