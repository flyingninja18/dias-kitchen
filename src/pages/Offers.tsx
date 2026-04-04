import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Offers = () => {
  const offerProducts = products.filter((p) => p.onOffer);

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs uppercase tracking-[3px] text-muted-foreground font-body mb-2 text-center">Limited Time</p>
        <h1 className="font-display text-4xl text-center mb-4">Special Offers</h1>
        <p className="font-body text-sm text-muted-foreground text-center max-w-md mx-auto mb-16">
          Handpicked deals on premium kitchenware. Quality without compromise.
        </p>

        {offerProducts.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm py-20 text-center">No offers available at the moment. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
