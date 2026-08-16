import { Badge, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import Clock from "@gravity-ui/icons/Clock"
import GeoPin from "@gravity-ui/icons/GeoPin"
import Handset from "@gravity-ui/icons/Handset"
import { MOCK_BRANCHES } from "../../utils/sucursales"

export const SucursalesPage = () => {
  return (
    <VStack align="stretch" gap="6" maxW="3xl">
      <VStack align="start" gap="1">
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
          Sucursales
        </Heading>
        <Text color="fg.muted">Los locales que pueden atender tu zona.</Text>
      </VStack>

      <VStack gap="3" align="stretch">
        {MOCK_BRANCHES.map((branch) => (
          <Box
            key={branch.id}
            bg="bg.panel"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="2xl"
            padding="5"
          >
            <HStack justify="space-between" marginBottom="3">
              <Text fontWeight="semibold" fontSize="lg">
                {branch.name}
              </Text>
              <Badge
                colorPalette={branch.open ? "green" : "red"}
                variant="subtle"
                borderRadius="full"
                paddingX="2.5"
                paddingY="1"
              >
                {branch.open ? "Abierta" : "Cerrada"}
              </Badge>
            </HStack>
            <VStack gap="2" align="stretch" color="fg.muted" fontSize="sm">
              <HStack gap="2">
                <Box color="brand.600" display="inline-flex">
                  <GeoPin width={16} height={16} />
                </Box>
                <Text>{branch.address}</Text>
              </HStack>
              <HStack gap="2">
                <Box color="brand.600" display="inline-flex">
                  <Handset width={16} height={16} />
                </Box>
                <Text>{branch.phone}</Text>
              </HStack>
              <HStack gap="2">
                <Box color="brand.600" display="inline-flex">
                  <Clock width={16} height={16} />
                </Box>
                <Text>Hoy: {branch.hours}</Text>
                <Text color="fg.subtle">· {branch.distanceKm.toLocaleString("es-AR")} km</Text>
              </HStack>
            </VStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  )
}
