import useSWR from "swr"
import type { Product } from "../types/catalog"
import { getProductById } from "../utils/catalog"

interface UseProductReturn {
  product: Product | null
  isLoading: boolean
}

export const useProduct = (productId: number | undefined): UseProductReturn => {
  const { data, isLoading } = useSWR<Product | null>(
    productId ? `/api/products/${productId}` : null,
    async (url: string) => {
      const res = await fetch(url).catch(() => null)
      if (res && res.ok) {
        const json = await res.json().catch(() => null)
        if (json && typeof json === "object" && "id" in json) {
          return json as Product
        }
      }
      return productId ? getProductById(productId) ?? null : null
    },
  )

  return { product: data ?? null, isLoading }
}
