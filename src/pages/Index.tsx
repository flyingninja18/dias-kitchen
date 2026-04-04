import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-kitchen.jpg";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section
        className="h-screen w-full flex items-center px-[8%] bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(75deg, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.2)), url(${heroImage})`,
        }}
      >
        <div className="max-w-[650px] fade-in-up">
          <h1 className="font-display text-[clamp(36px,6vw,52px)] font-light leading-[1.05] mb-6 text-primary-foreground drop-shadow-lg">
            Kitchen essentials crafted for everyday cooking.
          </h1>
          <p className="font-body text-base leading-relaxed mb-10 text-primary-foreground/90 font-light">
            Discover premium utensils, crockery, and kitchenware carefully selected
            to bring elegance, durability, and joy to your cooking experience.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/category"
              className="inline-block px-10 py-4 bg-card text-foreground font-body text-xs font-medium tracking-[1.5px] uppercase no-underline hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Collection
            </Link>
            <Link
              to="/brands"
              className="inline-block px-10 py-4 border border-primary-foreground/60 text-primary-foreground font-body text-xs font-medium tracking-[1.5px] uppercase no-underline hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
            >
              Our Brands
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[3px] text-muted-foreground font-body mb-2">Curated Selection</p>
            <h2 className="font-display text-3xl">Featured Products</h2>
          </div>
          <Link to="/category" className="font-body text-sm text-muted-foreground hover:text-foreground no-underline transition-colors">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-secondary py-5">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-around text-center gap-4 px-4">
          {["Free Delivery on ₹2000+", "Trusted Brands Only", "Easy WhatsApp Ordering", "Secure Packaging"].map((t) => (
            <span key={t} className="font-body text-sm font-medium text-foreground">{t}</span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h3 className="font-display text-2xl mb-3">Dias Kitchen</h3>
          <p className="font-body text-sm text-primary-foreground/60">Premium Cookware & Kitchen Essentials</p>
          <p className="font-body text-xs text-primary-foreground/40 mt-8">© 2025 Dias Kitchen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
