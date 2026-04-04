import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import logoImage from "@/assets/logo_image.png";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "CATEGORY", path: "/category" },
  { label: "BRANDS", path: "/brands" },
  { label: "OFFERS", path: "/offers" },
];

const Navbar = () => {
  const { setIsOpen, itemCount } = useCart();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex justify-center pt-5 pb-3 transition-colors duration-300 ${isHome ? "" : "bg-card shadow-sm"}`}>
      <div className="w-[90%] max-w-[1200px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-md border border-border flex items-center justify-center bg-card">
            <img src={logoImage} alt="Dias Kitchen" className="w-full h-full object-cover" />
          </div>
          <span className={`font-display text-xl font-semibold tracking-wide hidden sm:block ${isHome ? "text-primary-foreground" : "text-foreground"}`}>
            Dias Kitchen
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex glass-surface rounded-full px-2 py-1 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`no-underline font-body text-sm font-medium tracking-wide px-5 py-2.5 rounded-full transition-all duration-300 ${
                location.pathname === link.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-[50px] h-[50px] rounded-full bg-card flex items-center justify-center shadow-md border border-border cursor-pointer hover:scale-105 transition-transform"
        >
          <ShoppingBag size={20} className="text-foreground" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[11px] font-semibold flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
