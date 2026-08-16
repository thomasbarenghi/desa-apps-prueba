import { useState } from "react"
import { useAddressStore } from "../../../stores/addressStore"
import type { Address, AddressInput } from "../../../types/address"

const EMPTY_FORM: AddressInput = { label: "", street: "", city: "", reference: "" }

export const useAddressForm = () => {
  const addAddress = useAddressStore((state) => state.addAddress)
  const updateAddress = useAddressStore((state) => state.updateAddress)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<AddressInput>(EMPTY_FORM)

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setOpen(true)
  }

  const openEdit = (address: Address) => {
    setEditingId(address.id)
    setForm({
      label: address.label,
      street: address.street,
      city: address.city,
      reference: address.reference ?? "",
    })
    setOpen(true)
  }

  const close = () => setOpen(false)

  const setField =
    (field: keyof AddressInput) =>
    (value: string) =>
      setForm((prev) => ({ ...prev, [field]: value }))

  const isValid = form.street.trim() !== "" && form.city.trim() !== ""

  const submit = () => {
    if (!isValid) return
    const input: AddressInput = {
      label: form.label.trim() || "Dirección",
      street: form.street.trim(),
      city: form.city.trim(),
      reference: form.reference?.trim() || undefined,
    }
    if (editingId) updateAddress(editingId, input)
    else addAddress(input)
    close()
  }

  return {
    open,
    editing: editingId !== null,
    form,
    setField,
    isValid,
    openCreate,
    openEdit,
    close,
    submit,
  }
}
