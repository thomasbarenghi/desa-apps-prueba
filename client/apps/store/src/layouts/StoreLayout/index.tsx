import { Box, Container } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { StoreHeader } from "../../components/StoreHeader"
import { MobileStoreNavigation } from "../../components/MobileStoreNavigation"
import type { StoreLayoutProps } from "./types"

export const StoreLayout = ({ clientId }: StoreLayoutProps) => {
  return (
    <Box bg="bg" minH="100vh" pb={{ base: "16", md: "0" }}>
      <StoreHeader clientId={clientId} />
      <Container as="main" maxW="1200px" py="8">
        <Outlet />
      </Container>
      <MobileStoreNavigation clientId={clientId} />
    </Box>
  )
}
