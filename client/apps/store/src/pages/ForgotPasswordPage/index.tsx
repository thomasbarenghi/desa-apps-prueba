import { VStack } from "@chakra-ui/react"
import { AuthSuccess, Muted, PageHeader, PrimaryButton, TextField, TextLink } from "@repo/components"
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
      <PageHeader
        title="Recuperá tu contraseña"
        description="Ingresá tu email y te enviamos un enlace para restablecerla."
      />

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
          <PrimaryButton type="submit" disabled={!isValid || submitting} loading={submitting} marginTop="2">
            Enviar instrucciones
          </PrimaryButton>
        </VStack>
      </form>

      <Muted fontSize="sm" textAlign="center">
        <TextLink to={routes.login}>Volver al login</TextLink>
      </Muted>
    </VStack>
  )
}
