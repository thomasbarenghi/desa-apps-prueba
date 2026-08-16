import { Box, Container, useDisclosure } from "@chakra-ui/react"
import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { StoreHeader } from "../../components/StoreHeader"
import { MobileStoreNavigation } from "../../components/MobileStoreNavigation"
import { AddressPickerModal } from "../../components/AddressPickerModal"
import { useAddressStore } from "../../stores/addressStore"

const SUB_PAGE_PATHS = ["/perfil/editar", "/perfil/direcciones", "/sucursales", "/checkout"]

export const StoreLayout = () => {
  const { open, onOpen, onClose } = useDisclosure()
  const selectedAddressId = useAddressStore((state) => state.selectedAddressId)
  const { pathname } = useLocation()
  const hasBackHeader =
    SUB_PAGE_PATHS.includes(pathname) ||
    pathname.startsWith("/productos/") ||
    pathname.startsWith("/pedidos/")

  useEffect(() => {
    if (selectedAddressId == null) onOpen()
  }, [selectedAddressId, onOpen])

  return (
    <Box bg="bg" minH="100vh" pb={{ base: "28", md: "0" }}>
      {!hasBackHeader ? <StoreHeader onOpenLocation={onOpen} /> : null}
      <Container
        as="main"
        maxW="1200px"
        paddingTop={{ base: hasBackHeader ? "3" : "6", md: hasBackHeader ? "6" : "10" }}
        paddingBottom={{ base: "6", md: "10" }}
      >
        <Outlet />
      </Container>
      <MobileStoreNavigation />
      <AddressPickerModal open={open} onClose={onClose} />
    </Box>
  )
}
