import { useEffect, useState } from "react"
import { useAddressStore } from "../../../stores/addressStore"
import type { Address, AddressInput } from "@repo/domain"
import type { AddressPickerForm } from "../types"

const EMPTY_FORM: AddressPickerForm = {
  label: "",
  street: "",
  city: "",
  reference: "",
}

export interface UseAddressPickerReturn {
  addresses: Address[]
  showForm: boolean
  form: AddressPickerForm
  setField: (field: keyof AddressPickerForm) => (value: string) => void
  isFormValid: boolean
  handleSelect: (id: string) => void
  handleAdd: () => void
  openForm: () => void
  closeForm: () => void
}

export const useAddressPicker = (
  open: boolean,
  onClose: () => void,
): UseAddressPickerReturn => {
  const addresses = useAddressStore((state) => state.addresses)
  const selectAddress = useAddressStore((state) => state.selectAddress)
  const addAddress = useAddressStore((state) => state.addAddress)

  const [showForm, setShowForm] = useState(addresses.length === 0)
  const [form, setForm] = useState<AddressPickerForm>(EMPTY_FORM)

  useEffect(() => {
    if (!open) {
      setShowForm(addresses.length === 0)
      setForm(EMPTY_FORM)
    }
  }, [open, addresses.length])

  const setField =
    (field: keyof AddressPickerForm) =>
    (value: string) =>
      setForm((prev) => ({ ...prev, [field]: value }))

  const isFormValid = form.street.trim() !== "" && form.city.trim() !== ""

  const handleSelect = (id: string) => {
    selectAddress(id)
    onClose()
  }

  const handleAdd = () => {
    if (!isFormValid) return
    const input: AddressInput = {
      label: form.label.trim() || "Dirección",
      street: form.street.trim(),
      city: form.city.trim(),
      reference: form.reference.trim() || undefined,
    }
    addAddress(input)
    onClose()
  }

  return {
    addresses,
    showForm,
    form,
    setField,
    isFormValid,
    handleSelect,
    handleAdd,
    openForm: () => setShowForm(true),
    closeForm: () => setShowForm(false),
  }
}
