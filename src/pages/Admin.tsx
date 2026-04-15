import { motion } from "framer-motion";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/lib/data-provider";

const Admin = () => {
  const { data: products = [], isLoading } = useProducts();
  const salesLog = [
    { date: "2025-03-28", items: "Prestige Glory Handi (3.5L) × 2", total: 3730, orderId: "DK-M1A2B-XY4Z" },
    { date: "2025-03-27", items: "Hawkins Pressure Cooker (5L) × 1", total: 2520, orderId: "DK-K9J3C-QR8T" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 bg-secondary/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl mb-2 tracking-tight">Admin Dashboard</h1>
            <p className="font-body text-sm text-muted-foreground">
              Loaded {products.length} products from CSV. Prepare for Cloudflare Access protection.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-[11px] font-body font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              CSV Loaded
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Products", value: products.length },
            { label: "On Offer", value: products.filter((p) => p.onOffer).length },
            { label: "Out of Stock", value: products.filter((p) => p.totalStock === 0).length },
            { label: "Brands", value: [...new Set(products.map((p) => p.brand))].length },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-5">
              <p className="font-body text-[11px] uppercase tracking-[2px] text-muted-foreground">{stat.label}</p>
              <p className="font-display text-2xl mt-1 tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden mb-12">
          <div className="px-4 py-3 border-b border-border bg-secondary/50">
            <h2 className="font-body text-sm font-semibold tracking-tight">Inventory (from CSV)</h2>
          </div>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground font-body text-sm">Loading CSV data…</div>
            ) : (
              <table className="w-full font-body text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left px-4 py-3 font-medium">Product</th>
                    <th className="text-left px-4 py-3 font-medium">Brand</th>
                    <th className="text-left px-4 py-3 font-medium">Category</th>
                    <th className="text-center px-4 py-3 font-medium">Offer</th>
                    <th className="text-center px-4 py-3 font-medium">Discount</th>
                    <th className="text-center px-4 py-3 font-medium">Price</th>
                    <th className="text-center px-4 py-3 font-medium">Stock</th>
                    <th className="text-left px-4 py-3 font-medium">Variants</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p: Product) => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 font-medium max-w-[200px] truncate">{p.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.brand}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{p.subcategory}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block w-2 h-2 rounded-full ${p.onOffer ? "bg-green-500" : "bg-border"}`} />
                      </td>
                      <td className="px-4 py-3 text-center">{p.onOffer ? `${p.discountPercent}%` : "—"}</td>
                      <td className="px-4 py-3 text-center">₹{p.price.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-center">{p.totalStock}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{p.variants.map((v) => v.size).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Sales Intent Log */}
        <h2 className="font-display text-2xl mb-6 tracking-tight">WhatsApp Intent Log</h2>
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full font-body text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Order ID</th>
                <th className="text-left px-4 py-3 font-medium">Items</th>
                <th className="text-right px-4 py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {salesLog.map((log, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-muted-foreground">{log.date}</td>
                  <td className="px-4 py-3 font-mono text-xs">{log.orderId}</td>
                  <td className="px-4 py-3">{log.items}</td>
                  <td className="px-4 py-3 text-right font-semibold">₹{log.total.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
