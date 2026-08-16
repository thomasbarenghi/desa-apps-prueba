import { VStack } from "@chakra-ui/react"
import { Muted, PageHeader, PasswordField, PrimaryButton, TextField, TextLink } from "@repo/components"
import { routes } from "../../routes"
import { useRegister } from "./hooks/useRegister"

export const RegisterPage = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    confirm,
    setConfirm,
    passwordsMatch,
    submitting,
    isValid,
    onSubmit,
  } = useRegister()

  return (
    <VStack gap="8" align="stretch">
      <PageHeader title="Creá tu cuenta" description="Sumate y pedí en minutos." />

      <form onSubmit={onSubmit}>
        <VStack gap="4" align="stretch">
          <TextField
            label="Nombre"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Juan"
            autoComplete="given-name"
          />
          <TextField
            label="Apellido"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Pérez"
            autoComplete="family-name"
          />
          <TextField
            label="Email"
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="juan.perez@unahur.edu.ar"
          />
          <TextField
            label="Teléfono"
            required
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+54 11 5555-1234"
          />
          <PasswordField
            label="Contraseña"
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
            Crear cuenta
          </PrimaryButton>
        </VStack>
      </form>

      <Muted fontSize="sm" textAlign="center">
        ¿Ya tenés cuenta? <TextLink to={routes.login}>Ingresá</TextLink>
      </Muted>
    </VStack>
  )
}
