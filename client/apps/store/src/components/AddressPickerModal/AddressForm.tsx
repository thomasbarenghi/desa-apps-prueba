import { VStack } from "@chakra-ui/react"
import ChevronLeft from "@gravity-ui/icons/ChevronLeft"
import { GhostButton, PrimaryButton, TextField } from "@repo/components"
import type { AddressPickerForm } from "./types"

interface AddressFormProps {
  form: AddressPickerForm
  setField: (field: keyof AddressPickerForm) => (value: string) => void
  isValid: boolean
  onSubmit: () => void
  onBack?: () => void
}

export const AddressForm = ({ form, setField, isValid, onSubmit, onBack }: AddressFormProps) => {
  return (
    <VStack gap="4" align="stretch">
      {onBack ? (
        <GhostButton
          size="sm"
          alignSelf="flex-start"
          paddingX="3"
          color="fg.muted"
          _hover={{ color: "fg", bg: "bg.muted" }}
          onClick={onBack}
        >
          <ChevronLeft width={16} height={16} />
          Volver
        </GhostButton>
      ) : null}

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
        Guardar dirección
      </PrimaryButton>
    </VStack>
  )
}
