import { Button, HStack, Image, Text, VStack } from "@chakra-ui/react"
import TrashBin from "@gravity-ui/icons/TrashBin"
import { lineTotal, lineUnitPrice } from "../../stores/cartStore"
import { formatPrice } from "../../utils/catalog"
import { QuantityStepper } from "../QuantityStepper"
import type { CartLineCardProps } from "./types"

export const CartLineCard = ({ line, onQuantityChange, onRemove }: CartLineCardProps) => {
  const optionsLabel = line.options.map((o) => o.option).join(" · ")

  return (
    <HStack gap="3" align="start" bg="bg.panel" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="3">
      <Image
        src={line.image}
        alt={line.name}
        width="64px"
        height="64px"
        borderRadius="xl"
        objectFit="cover"
        flexShrink={0}
      />
      <VStack align="start" gap="1" flex="1" minWidth="0">
        <Text fontWeight="semibold" fontSize="sm" lineClamp={1}>
          {line.name}
        </Text>
        {optionsLabel ? (
          <Text color="fg.muted" fontSize="xs" lineClamp={2}>
            {optionsLabel}
          </Text>
        ) : null}
        {line.notes ? (
          <Text color="fg.subtle" fontSize="xs" lineClamp={1}>
            Nota: {line.notes}
          </Text>
        ) : null}
        <Text color="fg.muted" fontSize="xs" fontVariantNumeric="tabular-nums">
          {formatPrice(lineUnitPrice(line))} c/u
        </Text>
        <Button
          size="2xs"
          variant="ghost"
          color="fg.subtle"
          paddingX="0"
          _hover={{ color: "danger" }}
          onClick={() => onRemove(line.id)}
        >
          <TrashBin width={14} height={14} />
          Eliminar
        </Button>
      </VStack>
      <VStack align="end" gap="2">
        <Text fontWeight="semibold" fontVariantNumeric="tabular-nums">
          {formatPrice(lineTotal(line))}
        </Text>
        <QuantityStepper
          value={line.quantity}
          onChange={(value) => onQuantityChange(line.id, value)}
        />
      </VStack>
    </HStack>
  )
}
