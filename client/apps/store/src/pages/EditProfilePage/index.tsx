import { Box, Heading, HStack, Link as ChakraLink, Text, VStack } from "@chakra-ui/react"
import ChevronLeft from "@gravity-ui/icons/ChevronLeft"
import { Link } from "react-router-dom"
import { ProfileForm } from "./ProfileForm"
import type { EditProfilePageProps } from "./types"

export const EditProfilePage = ({ userId }: EditProfilePageProps) => {
  return (
    <Box maxW="md" width="full" marginX="auto">
      <VStack align="stretch" gap="6">
        <Box>
          <ChakraLink asChild color="fg.muted" fontWeight="medium" fontSize="sm" _hover={{ color: "fg" }}>
            <Link to="/perfil">
              <HStack gap="1">
                <ChevronLeft width={16} height={16} />
                <Text>Volver al perfil</Text>
              </HStack>
            </Link>
          </ChakraLink>
        </Box>
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
