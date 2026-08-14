import { Box, Heading, VStack } from "@chakra-ui/react"
import { ProfileForm } from "./ProfileForm"
import type { EditProfilePageProps } from "./types"

export const EditProfilePage = ({ userId }: EditProfilePageProps) => {
  return (
    <Box maxW="md" width="full" marginX="auto">
      <VStack align="stretch" gap="4">
        <Heading as="h1" size="lg">
          Editar perfil
        </Heading>
        <ProfileForm userId={userId} />
      </VStack>
    </Box>
  )
}
