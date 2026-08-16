import { Heading, VStack } from "@chakra-ui/react"
import { PrimaryButton, ResponsiveModal, TextField } from "@repo/components"
import type { AddressInput } from "@repo/domain"

interface AddressFormDialogProps {
  open: boolean
  editing: boolean
  form: AddressInput
  setField: (field: keyof AddressInput) => (value: string) => void
  isValid: boolean
  onClose: () => void
  onSubmit: () => void
}

export const AddressFormDialog = ({
  open,
  editing,
  form,
  setField,
  isValid,
  onClose,
  onSubmit,
}: AddressFormDialogProps) => {
  return (
    <ResponsiveModal open={open} onClose={onClose}>
      <Heading as="h2" fontSize="xl" fontWeight="bold" marginBottom="4">
        {editing ? "Editar dirección" : "Agregar dirección"}
      </Heading>
      <VStack gap="4" align="stretch">
        <TextField
          label="Nombre"
          value={form.label}
          onChange={(e) => setField("label")(e.target.value)}
          placeholder="Casa, Facultad, Trabajo…"
        />
        <TextField
          label="Calle y número"
          required
          value={form.street}
          onChange={(e) => setField("street")(e.target.value)}
          placeholder="Av. Ejemplo 123"
        />
        <TextField
          label="Localidad"
          required
          value={form.city}
          onChange={(e) => setField("city")(e.target.value)}
          placeholder="Hurlingham"
        />
        <TextField
          label="Referencia"
          value={form.reference}
          onChange={(e) => setField("reference")(e.target.value)}
          placeholder="Piso, depto, entre calles…"
        />
        <PrimaryButton
          width="full"
          disabled={!isValid}
          onClick={onSubmit}
          marginTop="2"
        >
          Guardar
        </PrimaryButton>
      </VStack>
    </ResponsiveModal>
  )
}
