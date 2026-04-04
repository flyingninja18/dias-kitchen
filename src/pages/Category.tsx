import { useState } from "react";
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
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-[1300px] mx-auto px-6 flex gap-10">
        {/* Sidebar */}
        <aside className="hidden md:block w-[280px] flex-shrink-0">
          <h2 className="font-display text-2xl mb-8 pb-3 border-b border-border">Categories</h2>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => { setActiveCategory(null); setSelectedSub(null); }}
                className={`w-full text-left font-body text-sm py-3 px-2 rounded transition-colors cursor-pointer ${
                  !activeCategory ? "bg-secondary font-medium" : "hover:bg-secondary/50"
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.name}>
                <button
                  onClick={() => { setActiveCategory(cat.name); setSelectedSub(null); }}
                  className={`w-full text-left font-body text-sm py-3 px-2 rounded transition-colors cursor-pointer flex justify-between ${
                    activeCategory === cat.name ? "bg-secondary font-medium" : "hover:bg-secondary/50"
                  }`}
                >
                  {cat.name}
                  <span className="text-muted-foreground text-xs">
                    {activeCategory === cat.name ? "−" : "+"}
                  </span>
                </button>
                {activeCategory === cat.name && (
                  <ul className="pl-4 mt-1 space-y-1">
                    {cat.subcategories.map((sub) => (
                      <li key={sub}>
                        <button
                          onClick={() => setSelectedSub(sub === selectedSub ? null : sub)}
                          className={`w-full text-left font-body text-xs py-2 px-2 rounded cursor-pointer transition-colors ${
                            selectedSub === sub ? "text-gold font-medium" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <h1 className="font-display text-3xl mb-8">
            {selectedSub || activeCategory || "All Products"}
          </h1>
          {filtered.length === 0 ? (
            <p className="text-muted-foreground font-body text-sm py-20 text-center">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
