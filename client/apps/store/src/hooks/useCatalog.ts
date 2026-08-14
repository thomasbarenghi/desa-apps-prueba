import useSWR from "swr"
import type { Category, Product } from "../types/catalog"
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "../utils/catalog"

interface CatalogResponse {
  categories: Category[]
  products: Product[]
}

interface UseCatalogReturn {
  categories: Category[]
  products: Product[]
  isLoading: boolean
}

const MOCK: CatalogResponse = { categories: MOCK_CATEGORIES, products: MOCK_PRODUCTS }

export const useCatalog = (): UseCatalogReturn => {
  const { data, isLoading } = useSWR<CatalogResponse>("/api/catalog", async (url: string) => {
    const res = await fetch(url).catch(() => null)
    if (res && res.ok) {
      const json = await res.json().catch(() => null)
      if (json && Array.isArray(json.categories) && Array.isArray(json.products)) {
        return json as CatalogResponse
      }
    }
    return MOCK
  })

  return {
    categories: data?.categories ?? [],
    products: data?.products ?? [],
    isLoading,
  }
}
