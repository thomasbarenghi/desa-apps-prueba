import { Button, Field, Input, VStack, HStack } from "@chakra-ui/react"
import { useProfile } from "../../hooks/useProfile"
import { useProfileForm } from "./hooks/useProfileForm"

interface ProfileFormProps {
  userId?: number
}

export const ProfileForm = ({ userId }: ProfileFormProps) => {
  const { user, isLoading } = useProfile(userId)
  const { values, isDirty, onChange, onSave, onCancel } = useProfileForm({ userId })

  if (isLoading) return null

  return (
    <VStack align="stretch" gap="4">
      <Field.Root>
        <Field.Label>Nombre</Field.Label>
        <Input value={values.firstName} onChange={(e) => onChange("firstName", e.target.value)} />
      </Field.Root>
      <Field.Root>
        <Field.Label>Apellido</Field.Label>
        <Input value={values.lastName} onChange={(e) => onChange("lastName", e.target.value)} />
      </Field.Root>
      <Field.Root>
        <Field.Label>Correo electrónico</Field.Label>
        <Input value={user?.email} readOnly />
      </Field.Root>
      <Field.Root>
        <Field.Label>Teléfono</Field.Label>
        <Input value={values.phone} onChange={(e) => onChange("phone", e.target.value)} />
      </Field.Root>
      <HStack gap="2">
        <Button variant="solid" bg="brand.600" color="white" flex="1" onClick={onSave} disabled={!isDirty}>
          Guardar cambios
        </Button>
        <Button variant="ghost" onClick={onCancel} disabled={!isDirty}>
          Cancelar cambios
        </Button>
      </HStack>
    </VStack>
  )
}
