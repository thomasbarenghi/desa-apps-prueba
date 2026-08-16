import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import { BackButton } from "../../components/BackButton"
import { ProfileForm } from "./ProfileForm"
import type { EditProfilePageProps } from "./types"

export const EditProfilePage = ({ userId }: EditProfilePageProps) => {
  return (
    <Box maxW="md" width="full" marginX="auto">
      <VStack align="stretch" gap="6">
        <BackButton />
        <VStack align="start" gap="1">
          <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
            Editar perfil
          </Heading>
          <Text color="fg.muted">Actualizá tus datos personales.</Text>
        </VStack>
        <ProfileForm userId={userId} />
      </VStack>
    </Box>
  )
}
