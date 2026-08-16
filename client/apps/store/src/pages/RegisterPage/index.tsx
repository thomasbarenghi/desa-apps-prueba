import { Button, Field, Heading, Input, Link as ChakraLink, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { PasswordInput } from "../../components/PasswordInput"
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
      <VStack align="start" gap="2">
        <Heading as="h1" fontSize={{ base: "4xl", md: "2xl" }} fontWeight="bold">
          Creá tu cuenta
        </Heading>
        <Text color="fg.muted">Sumate y pedí en minutos.</Text>
      </VStack>

      <form onSubmit={onSubmit}>
        <VStack gap="4" align="stretch">
          <Field.Root required>
            <Field.Label>Nombre</Field.Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Juan"
              autoComplete="given-name"
              size="lg"
              borderRadius="xl"
              bg="bg"
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>Apellido</Field.Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Pérez"
              autoComplete="family-name"
              size="lg"
              borderRadius="xl"
              bg="bg"
            />
          </Field.Root>
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
            <Field.Label>Teléfono</Field.Label>
            <Input
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+54 11 5555-1234"
              size="lg"
              borderRadius="xl"
              bg="bg"
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>Contraseña</Field.Label>
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
            Crear cuenta
          </Button>
        </VStack>
      </form>

      <Text fontSize="sm" color="fg.muted" textAlign="center">
        ¿Ya tenés cuenta?{" "}
        <ChakraLink asChild color="brand.600" fontWeight="medium">
          <Link to="/login">Ingresá</Link>
        </ChakraLink>
      </Text>
    </VStack>
  )
}
