import { useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import { useSearch } from "@/hooks/use-products";
import ProductCard from "@/components/ProductCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const { data: results = [], isLoading } = useSearch(query);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-[1320px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto mb-16">
          <h1 className="font-display text-3xl tracking-tight text-center mb-8">Search</h1>
          <div className="relative">
            <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, categories…"
              autoFocus
              className="w-full bg-secondary border border-border rounded-2xl pl-12 pr-10 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 tracking-tight"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                <X size={16} />
              </button>
            )}
          </div>
          {query.length >= 2 && (
            <p className="font-body text-xs text-muted-foreground mt-3 text-center">
              {isLoading ? "Searching…" : `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`}
            </p>
          )}
        </motion.div>

        {query.length < 2 ? (
          <p className="text-center text-muted-foreground font-body text-sm py-20">Type at least 2 characters to search.</p>
        ) : results.length === 0 && !isLoading ? (
          <p className="text-center text-muted-foreground font-body text-sm py-20">No products found for "{query}".</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
