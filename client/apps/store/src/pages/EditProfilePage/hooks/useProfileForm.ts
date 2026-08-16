import { useState } from "react"
import { useProfile } from "@repo/api"

interface UseProfileFormOptions {
  userId?: number
}

interface UseProfileFormReturn {
  values: { firstName: string; lastName: string; phone: string }
  isDirty: boolean
  onChange: (field: "firstName" | "lastName" | "phone", value: string) => void
  onSave: () => void
  onCancel: () => void
}

export const useProfileForm = ({ userId }: UseProfileFormOptions): UseProfileFormReturn => {
  const { user, updateProfile } = useProfile(userId)
  const [values, setValues] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    phone: user?.phone ?? "",
  })

  const isDirty = values.firstName !== user?.firstName || values.lastName !== user?.lastName || values.phone !== user?.phone

  const onChange = (field: "firstName" | "lastName" | "phone", value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const onSave = async () => {
    await updateProfile(values)
    setValues({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      phone: user?.phone ?? "",
    })
  }

  const onCancel = () => {
    setValues({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      phone: user?.phone ?? "",
    })
  }

  return { values, isDirty, onChange, onSave, onCancel }
}
