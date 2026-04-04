import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Category = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    if (selectedSub) return p.subcategory === selectedSub;
    if (activeCategory) return p.category === activeCategory;
    return true;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-[1320px] mx-auto px-6 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden md:block w-[240px] flex-shrink-0">
          <h2 className="font-display text-xl mb-8 pb-4 border-b border-border tracking-tight">Categories</h2>
          <ul className="space-y-0.5">
            <li>
              <button
                onClick={() => { setActiveCategory(null); setSelectedSub(null); }}
                className={`w-full text-left font-body text-[13px] py-2.5 px-3 rounded-lg transition-colors cursor-pointer tracking-tight ${
                  !activeCategory ? "bg-secondary font-medium" : "hover:bg-secondary/50 text-muted-foreground"
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.name}>
                <button
                  onClick={() => { setActiveCategory(cat.name); setSelectedSub(null); }}
                  className={`w-full text-left font-body text-[13px] py-2.5 px-3 rounded-lg transition-colors cursor-pointer flex justify-between tracking-tight ${
                    activeCategory === cat.name ? "bg-secondary font-medium" : "hover:bg-secondary/50 text-muted-foreground"
                  }`}
                >
                  {cat.name}
                  <span className="text-muted-foreground/50 text-xs">
                    {activeCategory === cat.name ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {activeCategory === cat.name && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-3 overflow-hidden"
                    >
                      {cat.subcategories.map((sub) => (
                        <li key={sub}>
                          <button
                            onClick={() => setSelectedSub(sub === selectedSub ? null : sub)}
                            className={`w-full text-left font-body text-xs py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                              selectedSub === sub ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {sub}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products */}
        <main className="flex-1">
          <motion.h1
            key={selectedSub || activeCategory || "all"}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-3xl mb-10 tracking-tight"
          >
            {selectedSub || activeCategory || "All Products"}
          </motion.h1>
          {filtered.length === 0 ? (
            <p className="text-muted-foreground font-body text-sm py-20 text-center">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Category;
