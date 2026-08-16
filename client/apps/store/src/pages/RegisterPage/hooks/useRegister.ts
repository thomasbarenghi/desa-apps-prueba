import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../../stores/authStore"

export const useRegister = () => {
  const register = useAuthStore((state) => state.register)
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const passwordsMatch = password === confirm
  const isValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    password.length >= 6 &&
    passwordsMatch

  const onSubmit = async (event?: FormEvent) => {
    event?.preventDefault()
    if (!isValid || submitting) return
    setSubmitting(true)
    try {
      await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      })
      navigate("/", { replace: true })
    } finally {
      setSubmitting(false)
    }
  }

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    confirm,
    setConfirm,
    passwordsMatch,
    submitting,
    isValid,
    onSubmit,
  }
}
