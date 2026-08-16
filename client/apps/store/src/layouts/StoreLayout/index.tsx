import { Box, Container } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { StoreHeader } from "../../components/StoreHeader"
import { MobileStoreNavigation } from "../../components/MobileStoreNavigation"

export const StoreLayout = () => {
  return (
    <Box bg="bg" minH="100vh" pb={{ base: "28", md: "0" }}>
      <StoreHeader />
      <Container as="main" maxW="1200px" py={{ base: "6", md: "10" }}>
        <Outlet />
      </Container>
      <MobileStoreNavigation />
    </Box>
  )
}
