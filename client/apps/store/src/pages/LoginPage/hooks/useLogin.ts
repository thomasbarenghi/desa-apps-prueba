import { useState } from "react"
import type { FormEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { routes } from "../../../routes"
import { useAuthStore } from "@repo/api"

interface LocationState {
  from?: { pathname?: string }
}

export const useLogin = () => {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isValid = email.trim() !== "" && password.length >= 6

  const onSubmit = async (event?: FormEvent) => {
    event?.preventDefault()
    if (!isValid || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      await login(email.trim())
      const from = (location.state as LocationState | null)?.from?.pathname ?? routes.home
      navigate(from, { replace: true })
    } catch {
      setError("No pudimos iniciar sesión. Revisá tus datos.")
    } finally {
      setSubmitting(false)
    }
  }

  return { email, setEmail, password, setPassword, submitting, error, isValid, onSubmit }
}
