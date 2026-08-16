import { HStack, VStack } from "@chakra-ui/react"
import { GhostButton, PrimaryButton, TextField } from "@repo/components"
import { useProfile } from "@repo/api"
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
      <TextField
        label="Nombre"
        value={values.firstName}
        onChange={(e) => onChange("firstName", e.target.value)}
      />
      <TextField
        label="Apellido"
        value={values.lastName}
        onChange={(e) => onChange("lastName", e.target.value)}
      />
      <TextField
        label="Correo electrónico"
        value={user?.email}
        readOnly
        color="fg.subtle"
      />
      <TextField
        label="Teléfono"
        value={values.phone}
        onChange={(e) => onChange("phone", e.target.value)}
      />
      <HStack gap="2" marginTop="2">
        <PrimaryButton flex="1" onClick={onSave} disabled={!isDirty}>
          Guardar cambios
        </PrimaryButton>
        <GhostButton onClick={onCancel} disabled={!isDirty}>
          Cancelar
        </GhostButton>
      </HStack>
    </VStack>
  )
}
