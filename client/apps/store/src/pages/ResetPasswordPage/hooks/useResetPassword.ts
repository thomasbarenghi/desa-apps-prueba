import { useState } from "react"
import type { FormEvent } from "react"

export const useResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const passwordsMatch = password === confirm
  const isValid = password.length >= 6 && passwordsMatch

  const onSubmit = async (event?: FormEvent) => {
    event?.preventDefault()
    if (!isValid || submitting) return
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSubmitting(false)
    setDone(true)
  }

  return {
    password,
    setPassword,
    confirm,
    setConfirm,
    passwordsMatch,
    submitting,
    done,
    isValid,
    onSubmit,
  }
}
