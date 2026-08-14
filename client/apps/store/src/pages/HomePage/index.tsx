import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useProfile } from "../../hooks/useProfile"

export const HomePage = () => {
  const { user } = useProfile()

  return (
    <VStack align="start" gap="6">
      <VStack align="start" gap="1">
        <Text color="fg.muted" fontSize="sm" fontWeight="medium">
          {user?.firstName ? `¡Hola, ${user?.firstName}!` : "¡Bienvenido!"}
        </Text>
        <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
          ¿Qué tenés ganas de comer hoy?
        </Heading>
        <Text color="fg.muted">Explorá el catálogo y armá tu pedido en minutos.</Text>
      </VStack>
      <Box>
        <Button asChild variant="solid" bg="brand.600" color="white" size="lg" borderRadius="full" px="8">
          <Link to="/catalogo">Ver catálogo</Link>
        </Button>
      </Box>
    </VStack>
  )
}
