export interface AddressPickerModalProps {
  open: boolean
  onClose: () => void
}

export interface AddressPickerForm {
  label: string
  street: string
  city: string
  reference: string
}
