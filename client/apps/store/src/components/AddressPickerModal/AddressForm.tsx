import { Button, Field, Input, VStack } from "@chakra-ui/react"
import ChevronLeft from "@gravity-ui/icons/ChevronLeft"
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
        <Button
          variant="ghost"
          size="sm"
          alignSelf="flex-start"
          borderRadius="full"
          paddingX="3"
          color="fg.muted"
          _hover={{ color: "fg", bg: "bg.muted" }}
          onClick={onBack}
        >
          <ChevronLeft width={16} height={16} />
          Volver
        </Button>
      ) : null}

      <Field.Root>
        <Field.Label>Nombre</Field.Label>
        <Input
          value={form.label}
          onChange={(e) => setField("label")(e.target.value)}
          placeholder="Casa, Facultad, Trabajo…"
          size="lg"
          borderRadius="xl"
          bg="bg.subtle"
        />
      </Field.Root>

      <Field.Root required>
        <Field.Label>Calle y número</Field.Label>
        <Input
          value={form.street}
          onChange={(e) => setField("street")(e.target.value)}
          placeholder="Av. Ejemplo 123"
          size="lg"
          borderRadius="xl"
          bg="bg.subtle"
        />
      </Field.Root>

      <Field.Root required>
        <Field.Label>Localidad</Field.Label>
        <Input
          value={form.city}
          onChange={(e) => setField("city")(e.target.value)}
          placeholder="Hurlingham"
          size="lg"
          borderRadius="xl"
          bg="bg.subtle"
        />
      </Field.Root>

      <Field.Root>
        <Field.Label>Referencia</Field.Label>
        <Input
          value={form.reference}
          onChange={(e) => setField("reference")(e.target.value)}
          placeholder="Piso, depto, entre calles…"
          size="lg"
          borderRadius="xl"
          bg="bg.subtle"
        />
      </Field.Root>

      <Button
        width="full"
        size="lg"
        borderRadius="full"
        bg="brand.600"
        color="white"
        _hover={{ bg: "brand.700" }}
        disabled={!isValid}
        onClick={onSubmit}
        marginTop="2"
      >
        Guardar dirección
      </Button>
    </VStack>
  )
}
