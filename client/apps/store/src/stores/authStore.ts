import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { RegisterInput } from "../types/auth"
import type { User } from "../types/user"
import { MOCK_USER } from "../utils/user"

interface AuthState {
  user: User | null
  bypassAuth: boolean
  login: (email: string, password: string) => Promise<void>
  register: (input: RegisterInput) => Promise<void>
  logout: () => void
  setBypassAuth: (value: boolean) => void
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      bypassAuth: false,

      login: async (email) => {
        await delay(600)
        set({ user: { ...MOCK_USER, email } })
      },

      register: async (input) => {
        await delay(600)
        set({
          user: {
            id: Date.now(),
            email: input.email,
            role: "client",
            firstName: input.firstName,
            lastName: input.lastName,
            phone: input.phone,
            active: true,
            createdAt: new Date().toISOString(),
          },
        })
      },

      logout: () => set({ user: null }),

      setBypassAuth: (value) => set({ bypassAuth: value }),
    }),
    {
      name: "store-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, bypassAuth: state.bypassAuth }),
    },
  ),
)
