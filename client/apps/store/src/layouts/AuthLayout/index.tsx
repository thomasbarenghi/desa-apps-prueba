import { Box } from "@chakra-ui/react"
import { Outlet, useLocation } from "react-router-dom"
import { BackButton } from "../../components/BackButton"
import { Logo } from "../../components/Logo"

export const AuthLayout = () => {
  const { pathname } = useLocation()
  const isLogin = pathname === "/login"

  return (
    <Box minH="100dvh" bg="bg">
      <Box
        minH="100dvh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent={{ base: "flex-start", md: "center" }}
        paddingX="5"
        paddingTop={{ base: isLogin ? "12" : "4", md: "8" }}
        paddingBottom={{ base: "calc(env(safe-area-inset-bottom) + 1.5rem)", md: "8" }}
      >
        <Box width="full" maxW="sm">
          <Box
            display="flex"
            alignItems="center"
            minHeight="10"
            marginBottom={{ base: isLogin ? "10" : "6", md: "8" }}
            justifyContent={isLogin ? { base: "flex-start", md: "center" } : "flex-start"}
          >
            {isLogin ? <Logo height="40px" /> : <BackButton />}
          </Box>
          <Box
            bg={{ base: "transparent", md: "bg.panel" }}
            border={{ base: "none", md: "1px solid" }}
            borderColor="border.subtle"
            borderRadius={{ base: "none", md: "3xl" }}
            padding={{ base: "0", md: "10" }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
