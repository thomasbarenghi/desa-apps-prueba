import { useEffect } from "react"
import useSWR from "swr"
import { useCartStore } from "../../../stores/cartStore"

interface UseCartCountOptions {
  clientId?: number
}

interface CartResponse {
  items?: Array<{ quantity: number }>
}

export const useCartCount = ({ clientId }: UseCartCountOptions = {}) => {
  const itemCount = useCartStore((state) => state.itemCount)
  const setItemCount = useCartStore((state) => state.setItemCount)

  const { data, isLoading } = useSWR<CartResponse | null>(
    clientId ? `/api/clients/${clientId}/cart` : null,
    async (url: string) => {
      const res = await fetch(url)
      if (!res.ok) return null
      return res.json()
    },
  )

  useEffect(() => {
    if (!data) return
    const count = data.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0
    setItemCount(count)
  }, [data, setItemCount])

  return { count: itemCount, isLoading }
}
