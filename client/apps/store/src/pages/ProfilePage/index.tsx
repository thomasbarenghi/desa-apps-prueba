import { Avatar, Box, Heading, Text, VStack } from "@chakra-ui/react"
import { useProfile } from "../../hooks/useProfile"
import { ProfileNav } from "./ProfileNav"
import type { ProfilePageProps } from "./types"

export const ProfilePage = ({ userId }: ProfilePageProps) => {
  const { user } = useProfile(userId)

  return (
    <Box maxW="md" width="full" marginX="auto">
      <VStack align="stretch" gap="8">
        <Box>
          <Heading as="h1" size="lg" marginBottom="4">
            Mi perfil
          </Heading>
          <Box
            bg="bg.muted"
            borderRadius="xl"
            padding="4"
            display="flex"
            alignItems="center"
            gap="4"
          >
            <Avatar.Root size="lg">
              <Avatar.Fallback name={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`} />
            </Avatar.Root>
            <Box>
              <Text fontWeight="semibold" fontSize="lg">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text color="fg.muted" fontSize="sm">
                {user?.email}
              </Text>
            </Box>
          </Box>
        </Box>
        <ProfileNav />
      </VStack>
    </Box>
  )
}
