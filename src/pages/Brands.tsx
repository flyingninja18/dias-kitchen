import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { brands, products } from "@/data/products";

const Brands = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[11px] uppercase tracking-[3px] text-muted-foreground font-body mb-2">Our Partners</p>
          <h1 className="font-display text-4xl tracking-tight">Brand Universe</h1>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((brand, i) => {
            const count = products.filter((p) => p.brand === brand).length;
            return (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/brands/${brand.toLowerCase()}`}
                  className="group border border-border rounded-2xl p-10 flex flex-col items-center justify-center hover:border-foreground/30 hover:shadow-lg transition-all duration-300 no-underline aspect-square"
                >
                  <span className="font-display text-2xl text-foreground group-hover:scale-105 transition-transform duration-300 tracking-tight">{brand}</span>
                  <span className="font-body text-[11px] text-muted-foreground mt-2">{count} products</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Brands;
