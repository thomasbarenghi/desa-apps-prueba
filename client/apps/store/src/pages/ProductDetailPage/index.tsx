import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import Check from "@gravity-ui/icons/Check"
import { Link, useNavigate, useParams } from "react-router-dom"
import { BackButton } from "../../components/BackButton"
import { EmptyState } from "../../components/EmptyState"
import { QuantityStepper } from "../../components/QuantityStepper"
import { routes } from "../../routes"
import { formatPrice, getCategoryName } from "../../utils/catalog"
import { useProductConfig } from "./hooks/useProductConfig"

export const ProductDetailPage = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const config = useProductConfig(productId ? Number(productId) : undefined)

  if (config.isLoading) {
    return (
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="8">
        <Skeleton height="360px" borderRadius="2xl" />
        <VStack gap="4" align="stretch">
          <Skeleton height="40px" width="60%" />
          <Skeleton height="16px" />
          <Skeleton height="16px" width="80%" />
          <Skeleton height="120px" borderRadius="xl" />
        </VStack>
      </Grid>
    )
  }

  if (!config.product) {
    return (
      <EmptyState
        title="Producto no encontrado"
        description="El producto que buscás no existe o ya no está disponible."
        action={
          <Button asChild bg="brand.600" color="white" borderRadius="full">
            <Link to={routes.catalog}>Volver al catálogo</Link>
          </Button>
        }
      />
    )
  }

  const { product } = config
  const categoryName = getCategoryName(product.categoryId)

  return (
    <VStack align="stretch" gap="6">
      <BackButton />

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: "6", md: "10" }} alignItems="start">
        <Box position={{ md: "sticky" }} top="24">
          <Box borderRadius="2xl" overflow="hidden" aspectRatio="1 / 1" bg="bg.muted">
            <Image src={product.image} alt={product.name} width="100%" height="100%" objectFit="cover" />
          </Box>
        </Box>

        <VStack align="stretch" gap="6">
          <VStack align="start" gap="2">
            {categoryName ? (
              <Text color="brand.600" fontWeight="semibold" fontSize="sm">
                {categoryName}
              </Text>
            ) : null}
            <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" lineHeight="1.1" textWrap="balance">
              {product.name}
            </Heading>
            <Text color="fg.muted">{product.description}</Text>
            <Text fontWeight="semibold" fontSize="xl" fontVariantNumeric="tabular-nums">
              {formatPrice(product.price)}
            </Text>
          </VStack>

          {product.configGroups.map((group) => (
            <ConfigGroup
              key={group.id}
              title={group.name}
              required={group.required}
              type={group.type}
              options={group.options}
              selected={config.selection[group.id]}
              onSelect={(optionId) => config.selectOption(group.id, optionId, group.type)}
            />
          ))}

          <VStack align="start" gap="2">
            <Text fontWeight="semibold">Observaciones</Text>
            <Textarea
              value={config.notes}
              onChange={(e) => config.setNotes(e.target.value)}
              placeholder="Sin cebolla, extra salsa, etc."
              bg="bg.panel"
              borderRadius="xl"
            />
          </VStack>

          <Box bg="bg.subtle" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
            <HStack justify="space-between" marginBottom="4">
              <Text fontWeight="semibold">Cantidad</Text>
              <QuantityStepper value={config.quantity} onChange={config.setQuantity} />
            </HStack>
            <HStack justify="space-between" marginBottom="4">
              <Text color="fg.muted">Total del ítem</Text>
              <Text fontWeight="bold" fontSize="xl" fontVariantNumeric="tabular-nums">
                {formatPrice(config.total)}
              </Text>
            </HStack>
            {config.missingRequired ? (
              <Text color="danger" fontSize="sm" marginBottom="3">
                Seleccioná las opciones obligatorias para continuar.
              </Text>
            ) : null}
            <Button
              width="full"
              size="lg"
              borderRadius="full"
              bg="brand.600"
              color="white"
              _hover={{ bg: "brand.700" }}
              disabled={!config.canAdd}
              onClick={() => {
                config.addToCart()
                navigate(routes.cart)
              }}
            >
              Agregar al carrito
            </Button>
          </Box>
        </VStack>
      </Grid>
    </VStack>
  )
}

interface ConfigGroupProps {
  title: string
  required: boolean
  type: "single" | "multiple"
  options: { id: number; name: string; priceDelta: number }[]
  selected: number | number[] | undefined
  onSelect: (optionId: number) => void
}

const ConfigGroup = ({ title, required, type, options, selected, onSelect }: ConfigGroupProps) => {
  const isSelected = (id: number) =>
    Array.isArray(selected) ? selected.includes(id) : selected === id

  return (
    <Box>
      <HStack gap="2" marginBottom="2">
        <Text fontWeight="semibold">{title}</Text>
        {required ? (
          <Text color="brand.600" fontSize="xs" fontWeight="semibold">
            Requerido
          </Text>
        ) : (
          <Text color="fg.subtle" fontSize="xs">
            Opcional
          </Text>
        )}
      </HStack>
      <VStack gap="2" align="stretch">
        {options.map((option) => {
          const selectedOption = isSelected(option.id)
          return (
            <Button
              key={option.id}
              variant="ghost"
              width="full"
              justifyContent="space-between"
              borderRadius="xl"
              paddingX="4"
              paddingY="3"
              border="1px solid"
              borderColor={selectedOption ? "brand.500" : "border.subtle"}
              bg={selectedOption ? "brand.50" : "bg.panel"}
              _hover={{ bg: selectedOption ? "brand.50" : "bg.muted" }}
              onClick={() => onSelect(option.id)}
            >
              <HStack gap="2.5">
                <Box
                  width="18px"
                  height="18px"
                  borderRadius={type === "single" ? "full" : "sm"}
                  border="1.5px solid"
                  borderColor={selectedOption ? "brand.500" : "border.emphasized"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={selectedOption ? "brand.500" : "transparent"}
                  color="white"
                >
                  {selectedOption && type === "multiple" ? (
                    <Check width={12} height={12} />
                  ) : null}
                </Box>
                <Text fontWeight="medium" color={selectedOption ? "fg" : "fg.muted"}>
                  {option.name}
                </Text>
              </HStack>
              <Text
                color={option.priceDelta > 0 ? "brand.600" : "fg.subtle"}
                fontWeight="semibold"
                fontSize="sm"
                fontVariantNumeric="tabular-nums"
              >
                {option.priceDelta > 0 ? `+ ${formatPrice(option.priceDelta)}` : "Sin cargo"}
              </Text>
            </Button>
          )
        })}
      </VStack>
    </Box>
  )
}
