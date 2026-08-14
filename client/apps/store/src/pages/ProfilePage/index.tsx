import { Avatar, Box, Heading, Text, VStack } from "@chakra-ui/react"
import Moon from "@gravity-ui/icons/Moon"
import { ColorModeButton } from "../../components/ColorModeProvider/ColorModeButton"
import { useProfile } from "../../hooks/useProfile"
import { ProfileNav } from "./ProfileNav"
import type { ProfilePageProps } from "./types"

export const ProfilePage = ({ userId }: ProfilePageProps) => {
  const { user } = useProfile(userId)
  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()

  return (
    <Box maxW="xl" width="full" marginX="auto">
      <VStack align="stretch" gap="8">
        <Box>
          <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" marginBottom="1">
            Mi perfil
          </Heading>
          <Text color="fg.muted">Tus datos y accesos de cuenta.</Text>
        </Box>

        <Box
          bg="bg.subtle"
          border="1px solid"
          borderColor="border.subtle"
          borderRadius="2xl"
          padding="5"
          display="flex"
          alignItems="center"
          gap="4"
        >
          <Avatar.Root size="xl">
            <Avatar.Fallback name={fullName} />
          </Avatar.Root>
          <Box minWidth="0">
            <Text fontWeight="semibold" fontSize="lg">
              {fullName || "Sin nombre"}
            </Text>
            <Text color="fg.muted" fontSize="sm" truncate>
              {user?.email}
            </Text>
            <Text color="fg.subtle" fontSize="sm">
              {user?.phone}
            </Text>
          </Box>
        </Box>

        <Box
          bg="bg.panel"
          border="1px solid"
          borderColor="border.subtle"
          borderRadius="2xl"
          padding="3.5"
          display={{ base: "flex", md: "none" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap="3">
            <Box color="brand.600" bg="bg.muted" borderRadius="full" padding="2" display="flex">
              <Moon width={18} height={18} />
            </Box>
            <Text fontWeight="medium">Apariencia</Text>
          </Box>
          <ColorModeButton />
        </Box>

        <ProfileNav />
      </VStack>
    </Box>
  )
}
