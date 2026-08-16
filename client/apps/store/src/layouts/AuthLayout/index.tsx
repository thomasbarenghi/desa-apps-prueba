import { Box, Image, useMediaQuery } from "@chakra-ui/react"
import { Outlet, useLocation } from "react-router-dom"
import { BackButton } from "../../components/BackButton"
import { Logo } from "../../components/Logo"
import { routes } from "../../routes"

const LOGIN_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"

export const AuthLayout = () => {
  const { pathname } = useLocation()
  const [isDesktop] = useMediaQuery(["(min-width: 48em)"], { ssr: false })
  const isLogin = pathname === routes.login

  if (isDesktop) {
    return (
      <Box minH="100dvh" display="flex" bg="bg">
        <Box
          width="480px"
          flexShrink={0}
          display="flex"
          flexDirection="column"
          paddingX="12"
          paddingY="10"
          overflowY="auto"
        >
          <Box width="100%" marginY="auto" display="flex" flexDirection="column">
            {isLogin ? (
              <Box alignSelf="flex-start" marginBottom="12">
                <Logo height="40px" />
              </Box>
            ) : null}
            <Outlet />
          </Box>
        </Box>
        <Box flex="1" minWidth={0} position="relative" overflow="hidden">
          <Image
            src={LOGIN_IMAGE}
            alt="Comida"
            position="absolute"
            inset="0"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
      </Box>
    )
  }

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
