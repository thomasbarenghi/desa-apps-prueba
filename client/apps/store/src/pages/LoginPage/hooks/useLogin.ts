import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import type { z } from 'zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginSchema } from '@repo/domain'
import { routes } from '../../../routes'
import { useAuthStore } from '@repo/api'

type LoginValues = z.infer<typeof loginSchema>

interface LocationState {
  from?: { pathname?: string }
}

export const useLogin = () => {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitting(true)
    setError(null)
    try {
      await login(values.email.trim())
      const from = (location.state as LocationState | null)?.from?.pathname ?? routes.home
      navigate(from, { replace: true })
    } catch {
      setError('No pudimos iniciar sesión. Revisá tus datos.')
    } finally {
      setSubmitting(false)
    }
  })

  return { form, submitting, error, onSubmit }
}
