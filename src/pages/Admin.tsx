import { useState } from "react";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

const Admin = () => {
  const [productState, setProductState] = useState<Product[]>(JSON.parse(JSON.stringify(products)));
  const [salesLog] = useState<{ date: string; items: string; total: number }[]>([
    { date: "2025-03-28", items: "Prestige Glory Handi (3.5L) × 2", total: 3730 },
    { date: "2025-03-27", items: "Hawkins Pressure Cooker (5L) × 1", total: 2520 },
  ]);

  const toggleOffer = (id: string) => {
    setProductState((prev) =>
      prev.map((p) => (p.id === id ? { ...p, onOffer: !p.onOffer } : p))
    );
  };

  const setDiscount = (id: string, value: number) => {
    setProductState((prev) =>
      prev.map((p) => (p.id === id ? { ...p, discountPercent: value } : p))
    );
  };

  const setStock = (id: string, variantIdx: number, stock: number) => {
    setProductState((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const variants = [...p.variants];
        variants[variantIdx] = { ...variants[variantIdx], stock };
        return { ...p, variants };
      })
    );
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-secondary/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="font-display text-3xl mb-2">Admin Dashboard</h1>
        <p className="font-body text-sm text-muted-foreground mb-10">Manage products, offers, and stock.</p>

        {/* Products Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full font-body text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left px-4 py-3 font-medium">Product</th>
                  <th className="text-left px-4 py-3 font-medium">Brand</th>
                  <th className="text-center px-4 py-3 font-medium">On Offer</th>
                  <th className="text-center px-4 py-3 font-medium">Discount %</th>
                  <th className="text-left px-4 py-3 font-medium">Stock (per variant)</th>
                </tr>
              </thead>
              <tbody>
                {productState.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.brand}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleOffer(p.id)}
                        className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${p.onOffer ? "bg-accent" : "bg-border"}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-card shadow transition-transform ${p.onOffer ? "left-5" : "left-0.5"}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={90}
                        value={p.discountPercent}
                        onChange={(e) => setDiscount(p.id, Number(e.target.value))}
                        className="w-16 text-center border border-border rounded px-2 py-1 font-body text-sm bg-background"
                        disabled={!p.onOffer}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 flex-wrap">
                        {p.variants.map((v, i) => (
                          <div key={v.size} className="flex items-center gap-1.5">
                            <span className="text-xs text-muted-foreground">{v.size}:</span>
                            <input
                              type="number"
                              min={0}
                              value={v.stock}
                              onChange={(e) => setStock(p.id, i, Number(e.target.value))}
                              className="w-14 text-center border border-border rounded px-1 py-1 font-body text-sm bg-background"
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Log */}
        <h2 className="font-display text-2xl mb-6">WhatsApp Intent Log</h2>
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full font-body text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Items</th>
                <th className="text-right px-4 py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {salesLog.map((log, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-muted-foreground">{log.date}</td>
                  <td className="px-4 py-3">{log.items}</td>
                  <td className="px-4 py-3 text-right text-gold">₹{log.total.toLocaleString("en-IN")}</td>
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
