import { Badge, Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import GeoPin from "@gravity-ui/icons/GeoPin"
import PencilToSquare from "@gravity-ui/icons/PencilToSquare"
import Plus from "@gravity-ui/icons/Plus"
import TrashBin from "@gravity-ui/icons/TrashBin"
import { BackButton } from "../../components/BackButton"
import { EmptyState } from "../../components/EmptyState"
import { useAddressStore } from "../../stores/addressStore"
import type { Address } from "../../types/address"
import { AddressFormDialog } from "./AddressFormDialog"
import { useAddressForm } from "./hooks/useAddressForm"

export const AddressesPage = () => {
  const addresses = useAddressStore((state) => state.addresses)
  const selectedAddressId = useAddressStore((state) => state.selectedAddressId)
  const selectAddress = useAddressStore((state) => state.selectAddress)
  const removeAddress = useAddressStore((state) => state.removeAddress)
  const form = useAddressForm()

  return (
    <VStack align="stretch" gap="6" maxW="2xl" marginX="auto">
      <BackButton />
      <VStack align="start" gap="1">
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
          Mis direcciones
        </Heading>
        <Text color="fg.muted">Administrá las direcciones a las que te llevamos el pedido.</Text>
      </VStack>

      <Button
        variant="outline"
        width="full"
        height="auto"
        borderRadius="xl"
        paddingY="3.5"
        borderColor="border.subtle"
        color="brand.600"
        _hover={{ borderColor: "border.emphasized", bg: "bg.muted" }}
        onClick={form.openCreate}
      >
        <Plus width={16} height={16} />
        Agregar dirección
      </Button>

      {addresses.length === 0 ? (
        <EmptyState
          icon={<GeoPin width={40} height={40} />}
          title="Sin direcciones guardadas"
          description="Cargá una dirección para poder pedir."
        />
      ) : (
        <VStack gap="3" align="stretch">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              selected={address.id === selectedAddressId}
              onSelect={() => selectAddress(address.id)}
              onEdit={() => form.openEdit(address)}
              onDelete={() => removeAddress(address.id)}
            />
          ))}
        </VStack>
      )}

      <AddressFormDialog
        open={form.open}
        editing={form.editing}
        form={form.form}
        setField={form.setField}
        isValid={form.isValid}
        onClose={form.close}
        onSubmit={form.submit}
      />
    </VStack>
  )
}

interface AddressCardProps {
  address: Address
  selected: boolean
  onSelect: () => void
  onEdit: () => void
  onDelete: () => void
}

const AddressCard = ({ address, selected, onSelect, onEdit, onDelete }: AddressCardProps) => {
  return (
    <Box bg="bg.panel" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
      <HStack justify="space-between" marginBottom="1">
        <HStack gap="2">
          <Text fontWeight="semibold" fontSize="lg">
            {address.label}
          </Text>
          {selected ? (
            <Badge colorPalette="orange" variant="subtle" borderRadius="full" paddingX="2.5" paddingY="1">
              Actual
            </Badge>
          ) : null}
        </HStack>
        <Box color="brand.600" display="flex">
          <GeoPin width={20} height={20} />
        </Box>
      </HStack>
      <Text color="fg.muted" fontSize="sm">
        {address.street}
      </Text>
      <Text color="fg.subtle" fontSize="sm">
        {address.city}
        {address.reference ? ` · ${address.reference}` : ""}
      </Text>

      <HStack gap="2" marginTop="4" flexWrap="wrap">
        {!selected ? (
          <Button
            size="sm"
            borderRadius="full"
            bg="brand.600"
            color="white"
            _hover={{ bg: "brand.700" }}
            onClick={onSelect}
          >
            Usar esta
          </Button>
        ) : null}
        <Button
          size="sm"
          variant="outline"
          borderRadius="full"
          borderColor="border.subtle"
          _hover={{ borderColor: "border.emphasized", bg: "bg.muted" }}
          onClick={onEdit}
        >
          <PencilToSquare width={14} height={14} />
          Editar
        </Button>
        <Button
          size="sm"
          variant="ghost"
          borderRadius="full"
          color="danger"
          _hover={{ bg: "bg.muted" }}
          onClick={onDelete}
        >
          <TrashBin width={14} height={14} />
          Eliminar
        </Button>
      </HStack>
    </Box>
  )
}
