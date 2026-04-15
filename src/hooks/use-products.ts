/**
 * React hooks that wrap the data-provider for use in components.
 * Uses TanStack Query for caching & loading states.
 */
import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  getProductsByBrand,
  getOfferProducts,
  getBrands,
  getCategories,
  getMaterials,
  searchProducts,
} from "@/lib/data-provider";

export function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: getProducts, staleTime: 5 * 60_000 });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
    staleTime: 5 * 60_000,
  });
}

export function useBrandProducts(brand: string | undefined) {
  return useQuery({
    queryKey: ["brand-products", brand],
    queryFn: () => getProductsByBrand(brand!),
    enabled: !!brand,
    staleTime: 5 * 60_000,
  });
}

export function useOfferProducts() {
  return useQuery({ queryKey: ["offer-products"], queryFn: getOfferProducts, staleTime: 5 * 60_000 });
}

export function useBrands() {
  return useQuery({ queryKey: ["brands"], queryFn: getBrands, staleTime: 5 * 60_000 });
}

export function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: getCategories, staleTime: 5 * 60_000 });
}

export function useMaterials() {
  return useQuery({ queryKey: ["materials"], queryFn: getMaterials, staleTime: 5 * 60_000 });
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchProducts(query),
    enabled: query.length >= 2,
    staleTime: 60_000,
  });
}
