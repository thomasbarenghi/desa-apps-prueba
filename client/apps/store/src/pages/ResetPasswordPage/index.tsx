import { VStack } from "@chakra-ui/react"
import { AuthSuccess, PageHeader, PasswordField, PrimaryButton } from "@repo/components"
import { routes } from "../../routes"
import { useResetPassword } from "./hooks/useResetPassword"

export const ResetPasswordPage = () => {
  const {
    password,
    setPassword,
    confirm,
    setConfirm,
    passwordsMatch,
    submitting,
    done,
    isValid,
    onSubmit,
  } = useResetPassword()

  if (done) {
    return (
      <AuthSuccess
        title="Contraseña restablecida"
        description="Ya podés ingresar con tu nueva contraseña."
        buttonLabel="Ir al login"
        to={routes.login}
      />
    )
  }

  return (
    <VStack gap="8" align="stretch">
      <PageHeader
        title="Restablecé tu contraseña"
        description="Elegí una nueva contraseña para tu cuenta."
      />

      <form onSubmit={onSubmit}>
        <VStack gap="4" align="stretch">
          <PasswordField
            label="Nueva contraseña"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
          />
          <PasswordField
            label="Repetir contraseña"
            required
            invalid={!passwordsMatch}
            errorText={!passwordsMatch ? "Las contraseñas no coinciden." : undefined}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repetí tu contraseña"
          />
          <PrimaryButton type="submit" disabled={!isValid || submitting} loading={submitting} marginTop="2">
            Restablecer contraseña
          </PrimaryButton>
        </VStack>
      </form>
    </VStack>
  )
}
