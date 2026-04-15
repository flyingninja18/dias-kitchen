import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useProducts, useCategories, useMaterials } from "@/hooks/use-products";

const PRICE_RANGES = [
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 – ₹3,500", min: 2000, max: 3500 },
  { label: "Above ₹3,500", min: 3500, max: Infinity },
];

const Category = () => {
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: materials = [] } = useMaterials();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))], [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedSub && p.subcategory !== selectedSub) return false;
      if (activeCategory && !selectedSub && p.category !== activeCategory) return false;
      if (selectedMaterial && p.material !== selectedMaterial) return false;
      if (selectedBrand && p.brand !== selectedBrand) return false;
      if (selectedPrice !== null) {
        const range = PRICE_RANGES[selectedPrice];
        const price = p.onOffer ? p.discountPrice : p.price;
        if (price < range.min || price > range.max) return false;
      }
      return true;
    });
  }, [products, activeCategory, selectedSub, selectedMaterial, selectedBrand, selectedPrice]);

  const clearFilters = () => {
    setActiveCategory(null);
    setSelectedSub(null);
    setSelectedMaterial(null);
    setSelectedPrice(null);
    setSelectedBrand(null);
  };

  const hasFilters = activeCategory || selectedSub || selectedMaterial || selectedPrice !== null || selectedBrand;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-[1320px] mx-auto px-6 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden md:block w-[240px] flex-shrink-0">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h2 className="font-display text-xl tracking-tight">Filters</h2>
            {hasFilters && (
              <button onClick={clearFilters} className="text-[11px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Clear all
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="mb-8">
            <p className="font-body text-[11px] uppercase tracking-[2px] text-muted-foreground mb-3">Category</p>
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
                    <span className="text-muted-foreground/50 text-xs">{activeCategory === cat.name ? "−" : "+"}</span>
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
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <p className="font-body text-[11px] uppercase tracking-[2px] text-muted-foreground mb-3">Price</p>
            <ul className="space-y-0.5">
              {PRICE_RANGES.map((range, i) => (
                <li key={range.label}>
                  <button
                    onClick={() => setSelectedPrice(selectedPrice === i ? null : i)}
                    className={`w-full text-left font-body text-[13px] py-2 px-3 rounded-lg cursor-pointer transition-colors tracking-tight ${
                      selectedPrice === i ? "bg-secondary font-medium" : "hover:bg-secondary/50 text-muted-foreground"
                    }`}
                  >
                    {range.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <div className="mb-8">
            <p className="font-body text-[11px] uppercase tracking-[2px] text-muted-foreground mb-3">Brand</p>
            <ul className="space-y-0.5">
              {brands.map((b) => (
                <li key={b}>
                  <button
                    onClick={() => setSelectedBrand(selectedBrand === b ? null : b)}
                    className={`w-full text-left font-body text-[13px] py-2 px-3 rounded-lg cursor-pointer transition-colors tracking-tight ${
                      selectedBrand === b ? "bg-secondary font-medium" : "hover:bg-secondary/50 text-muted-foreground"
                    }`}
                  >
                    {b}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Material */}
          <div className="mb-8">
            <p className="font-body text-[11px] uppercase tracking-[2px] text-muted-foreground mb-3">Material</p>
            <ul className="space-y-0.5">
              {materials.map((m) => (
                <li key={m}>
                  <button
                    onClick={() => setSelectedMaterial(selectedMaterial === m ? null : m)}
                    className={`w-full text-left font-body text-[13px] py-2 px-3 rounded-lg cursor-pointer transition-colors tracking-tight ${
                      selectedMaterial === m ? "bg-secondary font-medium" : "hover:bg-secondary/50 text-muted-foreground"
                    }`}
                  >
                    {m}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <main className="flex-1">
          <motion.h1
            key={selectedSub || activeCategory || "all"}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-3xl mb-2 tracking-tight"
          >
            {selectedSub || activeCategory || "All Products"}
          </motion.h1>
          <p className="font-body text-sm text-muted-foreground mb-10">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-secondary rounded-2xl aspect-square animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground font-body text-sm py-20 text-center">No products found matching your filters.</p>
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
