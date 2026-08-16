import { HStack, Text, VStack } from "@chakra-ui/react"
import { PageHeader, PasswordField, PrimaryButton, TextField, TextLink } from "@repo/components"
import { routes } from "../../routes"
import { useLogin } from "./hooks/useLogin"

export const LoginPage = () => {
  const { email, setEmail, password, setPassword, submitting, error, isValid, onSubmit } = useLogin()

  return (
    <VStack gap="8" align="stretch">
      <PageHeader title="Ingresá a tu cuenta" description="Pedí desde tu campus favorito." />

      <form onSubmit={onSubmit}>
        <VStack gap="4" align="stretch">
          <TextField
            label="Email"
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="juan.perez@unahur.edu.ar"
          />
          <PasswordField
            label="Contraseña"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
          />
          {error ? (
            <Text color="danger" fontSize="sm">
              {error}
            </Text>
          ) : null}
          <PrimaryButton type="submit" disabled={!isValid || submitting} loading={submitting} marginTop="2">
            Ingresar
          </PrimaryButton>
        </VStack>
      </form>

      <HStack justify="space-between" fontSize="sm" flexWrap="wrap" gap="2">
        <TextLink to={routes.forgotPassword}>Olvidé mi contraseña</TextLink>
        <TextLink to={routes.register}>Crear cuenta</TextLink>
      </HStack>
    </VStack>
  )
}
