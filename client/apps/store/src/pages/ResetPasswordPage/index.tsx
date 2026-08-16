import { Button, Field, Heading, Text, VStack } from "@chakra-ui/react"
import { AuthSuccess } from "../../components/AuthSuccess"
import { PasswordInput } from "../../components/PasswordInput"
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
        to="/login"
      />
    )
  }

  return (
    <VStack gap="8" align="stretch">
      <VStack align="start" gap="2">
        <Heading as="h1" fontSize={{ base: "4xl", md: "2xl" }} fontWeight="bold">
          Restablecé tu contraseña
        </Heading>
        <Text color="fg.muted">Elegí una nueva contraseña para tu cuenta.</Text>
      </VStack>

      <form onSubmit={onSubmit}>
        <VStack gap="4" align="stretch">
          <Field.Root required>
            <Field.Label>Nueva contraseña</Field.Label>
            <PasswordInput
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              size="lg"
              borderRadius="xl"
              bg="bg"
            />
          </Field.Root>
          <Field.Root required invalid={!passwordsMatch}>
            <Field.Label>Repetir contraseña</Field.Label>
            <PasswordInput
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repetí tu contraseña"
              size="lg"
              borderRadius="xl"
              bg="bg"
            />
            {!passwordsMatch ? (
              <Field.ErrorText>Las contraseñas no coinciden.</Field.ErrorText>
            ) : null}
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
            Restablecer contraseña
          </Button>
        </VStack>
      </form>
    </VStack>
  )
}
