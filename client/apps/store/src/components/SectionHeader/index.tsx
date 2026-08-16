import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import type { SectionHeaderProps } from "./types"

export const SectionHeader = ({ label, title, action }: SectionHeaderProps) => {
  return (
    <Flex justify="space-between" align="end" gap="4" wrap="wrap">
      <Box>
        {label ? (
          <Text
            color="brand.600"
            fontWeight="semibold"
            fontSize="xs"
            letterSpacing="0.08em"
            textTransform="uppercase"
            marginBottom="1"
          >
            {label}
          </Text>
        ) : null}
        <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
          {title}
        </Heading>
      </Box>
      {action}
    </Flex>
  )
}
