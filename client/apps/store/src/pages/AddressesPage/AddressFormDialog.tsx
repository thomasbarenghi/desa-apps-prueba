import {
  Box,
  Button,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  Field,
  Input,
  Portal,
  VStack,
} from "@chakra-ui/react"
import type { AddressInput } from "../../types/address"

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
    <DialogRoot open={open} onOpenChange={(details) => !details.open && onClose()} placement="center">
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent borderRadius="3xl" maxW="md">
            <Box padding="6">
              <DialogTitle fontSize="xl" fontWeight="bold" marginBottom="4">
                {editing ? "Editar dirección" : "Agregar dirección"}
              </DialogTitle>
              <VStack gap="4" align="stretch">
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
                  Guardar
                </Button>
              </VStack>
            </Box>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  )
}
