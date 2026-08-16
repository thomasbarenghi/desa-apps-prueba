import { Box, Button, Text, VStack } from "@chakra-ui/react"
import CircleCheckFill from "@gravity-ui/icons/CircleCheckFill"
import { Link } from "react-router-dom"
import type { AuthSuccessProps } from "./types"

export const AuthSuccess = ({ title, description, buttonLabel, to }: AuthSuccessProps) => {
  return (
    <VStack gap="3" align="center" textAlign="center" paddingY="6">
      <Box color="success" display="flex">
        <CircleCheckFill width={44} height={44} />
      </Box>
      <Text fontWeight="semibold" fontSize="lg">
        {title}
      </Text>
      <Text color="fg.muted" fontSize="sm">
        {description}
      </Text>
      <Button
        asChild
        size="lg"
        width="full"
        borderRadius="full"
        bg="brand.600"
        color="white"
        _hover={{ bg: "brand.700" }}
        marginTop="2"
      >
        <Link to={to}>{buttonLabel}</Link>
      </Button>
    </VStack>
  )
}
