import { Button, Field, Heading, HStack, Input, Link as ChakraLink, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { PasswordInput } from "../../components/PasswordInput"
import { useLogin } from "./hooks/useLogin"

export const LoginPage = () => {
  const { email, setEmail, password, setPassword, submitting, error, isValid, onSubmit } = useLogin()

  return (
    <VStack gap="8" align="stretch">
      <VStack align="start" gap="2">
        <Heading as="h1" fontSize={{ base: "4xl", md: "2xl" }} fontWeight="bold">
          Ingresá a tu cuenta
        </Heading>
        <Text color="fg.muted">Pedí desde tu campus favorito.</Text>
      </VStack>

      <form onSubmit={onSubmit}>
        <VStack gap="4" align="stretch">
          <Field.Root required>
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juan.perez@unahur.edu.ar"
              size="lg"
              borderRadius="xl"
              bg="bg"
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>Contraseña</Field.Label>
            <PasswordInput
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              size="lg"
              borderRadius="xl"
              bg="bg"
            />
          </Field.Root>
          {error ? (
            <Text color="danger" fontSize="sm">
              {error}
            </Text>
          ) : null}
          <Button
            type="submit"
            size="lg"
            height="12"
            borderRadius="full"
            bg="brand.600"
            color="white"
            _hover={{ bg: "brand.700" }}
            disabled={!isValid || submitting}
            loading={submitting}
            marginTop="2"
          >
            Ingresar
          </Button>
        </VStack>
      </form>

      <HStack justify="space-between" fontSize="sm" flexWrap="wrap" gap="2">
        <ChakraLink asChild color="brand.600" fontWeight="medium">
          <Link to="/recuperar-contrasena">Olvidé mi contraseña</Link>
        </ChakraLink>
        <ChakraLink asChild color="brand.600" fontWeight="medium">
          <Link to="/registro">Crear cuenta</Link>
        </ChakraLink>
      </HStack>
    </VStack>
  )
}
