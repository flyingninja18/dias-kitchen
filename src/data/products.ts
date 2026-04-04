import pot1 from "@/assets/pot_1.png";
import pot2 from "@/assets/pot_2.png";
import pot3 from "@/assets/pot_3.png";
import pot4 from "@/assets/pot_4.png";
import pot5 from "@/assets/pot_5.png";
import pot6 from "@/assets/pot_6.png";
import pot7 from "@/assets/pot_7.png";

export interface ProductVariant {
  size: string;
  price: number;
  originalPrice?: number;
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
  onOffer: boolean;
  discountPercent: number;
}

export const products: Product[] = [
  {
    id: "prestige-glory-handi",
    name: "Prestige Glory Stainless Steel Handi",
    brand: "Prestige",
    category: "Cookware & Bakeware",
    subcategory: "Handi",
    image: pot1,
    description: "High-performance cooking with even heat distribution and long-lasting durability, perfect for traditional Indian slow-cooking.",
    material: "High-Grade Stainless Steel",
    compatibility: "Induction & Gas Top",
    warranty: "2 Years",
    variants: [
      { size: "2L", price: 1465, stock: 8 },
      { size: "3.5L", price: 1865, stock: 5 },
      { size: "5L", price: 2250, stock: 3 },
    ],
    onOffer: false,
    discountPercent: 0,
  },
  {
    id: "hawkins-pressure-cooker",
    name: "Hawkins Classic Pressure Cooker",
    brand: "Hawkins",
    category: "Cookware & Bakeware",
    subcategory: "Pressure Cookers",
    image: pot2,
    description: "The iconic Hawkins pressure cooker — trusted by millions of Indian households for fast, energy-efficient cooking.",
    material: "Virgin Aluminium",
    compatibility: "Gas Top",
    warranty: "5 Years",
    variants: [
      { size: "3L", price: 2100, stock: 12 },
      { size: "5L", price: 2800, stock: 7 },
    ],
    onOffer: true,
    discountPercent: 10,
  },
  {
    id: "prestige-omega-kadai",
    name: "Prestige Omega Select Plus Kadai",
    brand: "Prestige",
    category: "Cookware & Bakeware",
    subcategory: "Kadai",
    image: pot3,
    description: "Non-stick kadai with superior Omega coating for healthy, oil-free cooking.",
    material: "Aluminium with Non-Stick Coating",
    compatibility: "Induction & Gas Top",
    warranty: "2 Years",
    variants: [
      { size: "Small", price: 1350, stock: 10 },
      { size: "Large", price: 1850, stock: 6 },
    ],
    onOffer: true,
    discountPercent: 15,
  },
  {
    id: "butterfly-gandhimathi-grinder",
    name: "Butterfly Gandhimathi Mixer Grinder",
    brand: "Butterfly",
    category: "Small Appliances",
    subcategory: "Mixer Grinders",
    image: pot4,
    description: "Powerful 750W mixer grinder with 3 stainless steel jars for all your grinding needs.",
    material: "ABS Body / Stainless Steel Jars",
    compatibility: "Electric — 230V",
    warranty: "2 Years",
    variants: [
      { size: "750W", price: 3500, stock: 4 },
    ],
    onOffer: false,
    discountPercent: 0,
  },
  {
    id: "prestige-svachh-cooker",
    name: "Prestige Svachh Pressure Cooker",
    brand: "Prestige",
    category: "Cookware & Bakeware",
    subcategory: "Pressure Cookers",
    image: pot5,
    description: "India's first spillage-control pressure cooker with a unique deep lid that prevents messy spills.",
    material: "Hard Anodised Aluminium",
    compatibility: "Gas Top",
    warranty: "5 Years",
    variants: [
      { size: "3L", price: 2450, stock: 9 },
      { size: "5L", price: 3200, stock: 4 },
    ],
    onOffer: false,
    discountPercent: 0,
  },
  {
    id: "hawkins-triply-tawa",
    name: "Hawkins Triply Stainless Steel Tawa",
    brand: "Hawkins",
    category: "Cookware & Bakeware",
    subcategory: "Tawa",
    image: pot6,
    description: "Tri-ply construction with aluminium core for even heating — ideal for rotis and dosas.",
    material: "Tri-Ply Stainless Steel",
    compatibility: "Induction & Gas Top",
    warranty: "3 Years",
    variants: [
      { size: "26cm", price: 1800, stock: 6 },
      { size: "30cm", price: 2100, stock: 3 },
    ],
    onOffer: true,
    discountPercent: 12,
  },
  {
    id: "pigeon-ceramic-casserole",
    name: "Pigeon Ceramic Casserole Set",
    brand: "Pigeon",
    category: "Dinnerware & Flatware",
    subcategory: "Serving Bowls",
    image: pot7,
    description: "Elegant ceramic casserole set with insulated body to keep food warm for hours.",
    material: "Food-Grade Ceramic",
    compatibility: "Serving Only",
    warranty: "1 Year",
    variants: [
      { size: "3-Piece Set", price: 1250, stock: 15 },
    ],
    onOffer: false,
    discountPercent: 0,
  },
];

export const brands = ["Prestige", "Hawkins", "Butterfly", "Pigeon"];

export const categories = [
  {
    name: "Cookware & Bakeware",
    subcategories: ["Handi", "Pressure Cookers", "Kadai", "Tawa", "Pots & Pans"],
  },
  {
    name: "Small Appliances",
    subcategories: ["Mixer Grinders", "Toasters", "Air Fryers"],
  },
  {
    name: "Dinnerware & Flatware",
    subcategories: ["Serving Bowls", "Plate Sets", "Cutlery"],
  },
  {
    name: "Kitchen Utensils & Gadgets",
    subcategories: ["Spatulas", "Measuring Tools", "Whisks"],
  },
  {
    name: "Storage & Organization",
    subcategories: ["Food Containers", "Spice Racks"],
  },
];
