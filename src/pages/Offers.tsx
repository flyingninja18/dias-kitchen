import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Offers = () => {
  const offerProducts = products.filter((p) => p.onOffer);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-[1320px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[11px] uppercase tracking-[3px] text-muted-foreground font-body mb-2">Limited Time</p>
          <h1 className="font-display text-4xl tracking-tight mb-4">Special Offers</h1>
          <p className="font-body text-[14px] text-muted-foreground max-w-md mx-auto">
            Handpicked deals on premium kitchenware. Quality without compromise.
          </p>
        </motion.div>

        {offerProducts.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm py-20 text-center">No offers available at the moment.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {offerProducts.map((p, i) => (
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

export default Offers;
