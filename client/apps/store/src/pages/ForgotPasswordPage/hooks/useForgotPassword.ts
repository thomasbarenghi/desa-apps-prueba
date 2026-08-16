import { useState } from "react"
import type { FormEvent } from "react"

export const useForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const isValid = email.trim() !== ""

  const onSubmit = async (event?: FormEvent) => {
    event?.preventDefault()
    if (!isValid || submitting) return
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSubmitting(false)
    setSent(true)
  }

  return { email, setEmail, submitting, sent, isValid, onSubmit }
}
