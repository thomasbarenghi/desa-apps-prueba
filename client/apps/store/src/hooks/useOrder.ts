import useSWR from "swr"
import type { Order } from "../types/order"
import { getOrderById } from "../utils/orders"

interface UseOrderReturn {
  order: Order | null
  isLoading: boolean
}

export const useOrder = (orderId: string | undefined): UseOrderReturn => {
  const { data, isLoading } = useSWR<Order | null>(
    orderId ? `/api/orders/${orderId}` : null,
    async (url: string) => {
      const res = await fetch(url).catch(() => null)
      if (res && res.ok) {
        const json = await res.json().catch(() => null)
        if (json && typeof json === "object" && "id" in json) {
          return json as Order
        }
      }
      return orderId ? getOrderById(orderId) : null
    },
  )

  return { order: data ?? null, isLoading }
}
