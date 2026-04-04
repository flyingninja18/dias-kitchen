import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-kitchen.jpg";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Index = () => {
  const featured = products.slice(0, 6);
  const { itemCount, setIsOpen, total } = useCart();

  return (
    <div>
      {/* Hero */}
      <section
        className="h-screen w-full flex items-end px-[6%] pb-[8%] bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.05) 100%), url(${heroImage})`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-[560px]"
        >
          <h1 className="font-display text-[clamp(32px,5.5vw,48px)] font-light leading-[1.05] mb-5 text-white tracking-tight">
            Kitchen essentials crafted for everyday cooking.
          </h1>
          <p className="font-body text-[15px] leading-relaxed mb-8 text-white/70 font-light">
            Premium utensils, crockery, and kitchenware selected for elegance, durability, and joy.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/category"
              className="inline-block px-8 py-3.5 bg-white text-black font-body text-[12px] font-medium tracking-[1px] uppercase no-underline rounded-full hover:bg-white/90 transition-all duration-200"
            >
              Explore Collection
            </Link>
            <Link
              to="/brands"
              className="inline-block px-8 py-3.5 border border-white/40 text-white font-body text-[12px] font-medium tracking-[1px] uppercase no-underline rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Our Brands
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid — Featured Products */}
      <section className="max-w-[1320px] mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[3px] text-muted-foreground font-body mb-2">Curated Selection</p>
            <h2 className="font-display text-3xl tracking-tight">Featured</h2>
          </div>
          <Link to="/category" className="font-body text-[13px] text-muted-foreground hover:text-foreground no-underline transition-colors">
            View All →
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 auto-rows-auto">
          {featured.map((p, i) => (
            <div key={p.id} className={i === 0 || i === 3 ? "md:row-span-2" : ""}>
              <ProductCard product={p} featured={i === 0 || i === 3} />
            </div>
          ))}
        </div>
      </section>

      {/* Brand Marquee */}
      <section className="border-y border-border py-12">
        <div className="max-w-[1320px] mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-20">
          {["Prestige", "Hawkins", "Butterfly", "Pigeon"].map((b) => (
            <Link
              key={b}
              to={`/brands/${b.toLowerCase()}`}
              className="font-display text-2xl md:text-3xl text-muted-foreground/40 hover:text-foreground transition-colors duration-300 no-underline tracking-tight"
            >
              {b}
            </Link>
          ))}
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {[
            { label: "Free Delivery", sub: "On orders above ₹2,000" },
            { label: "Trusted Brands", sub: "Authorized dealers only" },
            { label: "WhatsApp Order", sub: "Chat & confirm instantly" },
            { label: "Secure Packaging", sub: "Double-packed for safety" },
          ].map((item) => (
            <div key={item.label} className="text-center py-6">
              <p className="font-body text-sm font-semibold text-foreground tracking-tight">{item.label}</p>
              <p className="font-body text-xs text-muted-foreground mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-[1320px] mx-auto px-6 text-center">
          <h3 className="font-display text-2xl tracking-tight mb-3">Dias Kitchen</h3>
          <p className="font-body text-[13px] text-background/50">Premium Cookware & Kitchen Essentials</p>
          <p className="font-body text-[11px] text-background/30 mt-8">© 2025 Dias Kitchen. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Floating WhatsApp FAB */}
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 left-4 right-4 z-40 md:hidden"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="w-full glass-surface rounded-2xl px-5 py-4 flex items-center justify-between cursor-pointer shadow-lg border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center">
                <MessageCircle size={16} />
              </div>
              <div className="text-left">
                <p className="font-body text-[12px] font-semibold text-foreground">{itemCount} item{itemCount > 1 ? "s" : ""} in cart</p>
                <p className="font-body text-[11px] text-muted-foreground">₹{total.toLocaleString("en-IN")}</p>
              </div>
            </div>
            <span className="font-body text-[11px] font-semibold tracking-[1px] uppercase text-foreground">View Cart →</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
