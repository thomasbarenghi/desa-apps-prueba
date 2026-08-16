import { Button, Field, Heading, Input, Link as ChakraLink, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { AuthSuccess } from "../../components/AuthSuccess"
import { routes } from "../../routes"
import { useForgotPassword } from "./hooks/useForgotPassword"

export const ForgotPasswordPage = () => {
  const { email, setEmail, submitting, sent, isValid, onSubmit } = useForgotPassword()

  if (sent) {
    return (
      <AuthSuccess
        title="Revisá tu email"
        description={`Te enviamos un enlace para restablecer tu contraseña a ${email}.`}
        buttonLabel="Volver al login"
        to={routes.login}
      />
    )
  }

  return (
    <VStack gap="8" align="stretch">
      <VStack align="start" gap="2">
        <Heading as="h1" fontSize={{ base: "4xl", md: "2xl" }} fontWeight="bold">
          Recuperá tu contraseña
        </Heading>
        <Text color="fg.muted">Ingresá tu email y te enviamos un enlace para restablecerla.</Text>
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
            Enviar instrucciones
          </Button>
        </VStack>
      </form>

      <Text fontSize="sm" color="fg.muted" textAlign="center">
        <ChakraLink asChild color="brand.600" fontWeight="medium">
          <Link to={routes.login}>Volver al login</Link>
        </ChakraLink>
      </Text>
    </VStack>
  )
}
