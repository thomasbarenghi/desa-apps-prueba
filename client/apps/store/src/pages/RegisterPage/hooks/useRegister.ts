import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import type { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { registerSchema } from '@repo/domain'
import { routes } from '../../../routes'
import { useAuthStore } from '@repo/api'

type RegisterValues = z.infer<typeof registerSchema>

export const useRegister = () => {
  const register = useAuthStore((state) => state.register)
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirm: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitting(true)
    try {
      await register({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
      })
      navigate(routes.home, { replace: true })
    } finally {
      setSubmitting(false)
    }
  })

  return { form, submitting, onSubmit }
}
