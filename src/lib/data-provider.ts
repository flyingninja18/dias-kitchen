/**
 * Data Provider — CSV-backed, swappable to Cloudflare D1 later.
 *
 * Usage:
 *   import { getProducts, getCategories, getBrands } from "@/lib/data-provider";
 *   const products = await getProducts();
 *
 * To swap to D1, replace the fetchFromCSV() body with a SQL query.
 */
import Papa from "papaparse";

// ─── Types ──────────────────────────────────────────────────────────
export interface ProductVariant {
  size: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  material: string;
  compatibility: string;
  warranty: string;
  variants: ProductVariant[];
  price: number;
  discountPrice: number;
  onOffer: boolean;
  discountPercent: number;
  totalStock: number;
}

export interface CategoryGroup {
  name: string;
  subcategories: string[];
}

// ─── Image mapping (bundled assets) ─────────────────────────────────
// CSV references /assets/pot_X.png — map to actual bundled imports
const imageModules = import.meta.glob("/src/assets/pot_*.png", { eager: true, import: "default" }) as Record<string, string>;

function resolveImage(csvPath: string): string {
  // csvPath like "/assets/pot_1.png" → match "/src/assets/pot_1.png"
  const filename = csvPath.split("/").pop() || "";
  const key = `/src/assets/${filename}`;
  return imageModules[key] || csvPath;
}

// ─── CSV Parsing ────────────────────────────────────────────────────
interface RawRow {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  material: string;
  compatibility: string;
  warranty: string;
  variants: string; // "2L:1465|3.5L:1865"
  price: string;
  discount_price: string;
  stock: string;
}

function parseVariants(raw: string, totalStock: number): ProductVariant[] {
  if (!raw) return [{ size: "Standard", price: 0, stock: totalStock }];
  return raw.split("|").map((seg) => {
    const [size, priceStr] = seg.split(":");
    return { size: size.trim(), price: Number(priceStr), stock: Math.ceil(totalStock / raw.split("|").length) };
  });
}

function rowToProduct(row: RawRow): Product {
  const price = Number(row.price) || 0;
  const discountPrice = Number(row.discount_price) || 0;
  const totalStock = Number(row.stock) || 0;
  const onOffer = discountPrice > 0 && discountPrice < price;
  const discountPercent = onOffer ? Math.round(((price - discountPrice) / price) * 100) : 0;
  const variants = parseVariants(row.variants, totalStock);

  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    subcategory: row.subcategory,
    image: resolveImage(row.image),
    description: row.description,
    material: row.material,
    compatibility: row.compatibility,
    warranty: row.warranty,
    variants,
    price,
    discountPrice,
    onOffer,
    discountPercent,
    totalStock,
  };
}

// ─── Cache ──────────────────────────────────────────────────────────
let _cache: Product[] | null = null;

async function fetchFromCSV(): Promise<Product[]> {
  if (_cache) return _cache;

  const res = await fetch("/data/inventory.csv");
  const text = await res.text();
  const parsed = Papa.parse<RawRow>(text, { header: true, skipEmptyLines: true });
  _cache = parsed.data.map(rowToProduct);
  return _cache;
}

// ─── Public API (swap fetchFromCSV → fetchFromD1 later) ─────────────
/**
 * SWAP POINT: Replace this function body with a D1 SQL query:
 *   const { results } = await env.DB.prepare("SELECT * FROM products").all();
 *   return results.map(rowToProduct);
 */
export async function getProducts(): Promise<Product[]> {
  return fetchFromCSV();
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}

export async function getOfferProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.onOffer);
}

export async function getBrands(): Promise<string[]> {
  const products = await getProducts();
  return [...new Set(products.map((p) => p.brand))];
}

export async function getCategories(): Promise<CategoryGroup[]> {
  const products = await getProducts();
  const map = new Map<string, Set<string>>();
  for (const p of products) {
    if (!map.has(p.category)) map.set(p.category, new Set());
    map.get(p.category)!.add(p.subcategory);
  }
  return Array.from(map.entries()).map(([name, subs]) => ({
    name,
    subcategories: Array.from(subs),
  }));
}

export async function getMaterials(): Promise<string[]> {
  const products = await getProducts();
  return [...new Set(products.map((p) => p.material))];
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export function invalidateCache() {
  _cache = null;
}
