import useSWR from "swr"
import type { UpdateProfileInput, User } from "../types/user"
import { MOCK_USER } from "../utils/user"

interface UseProfileReturn {
  user: User | undefined
  isLoading: boolean
  updateProfile: (input: UpdateProfileInput) => Promise<void>
}

export const useProfile = (userId?: number): UseProfileReturn => {
  const { data, isLoading } = useSWR<User | null>(
    userId ? `/api/users/${userId}` : null,
    async (url: string) => {
      const res = await fetch(url)
      if (!res.ok) return null
      return res.json()
    },
  )

  const updateProfile = async (input: UpdateProfileInput) => {
    if (!userId) return
    await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
  }

  return { user: data ?? MOCK_USER, isLoading, updateProfile }
}
