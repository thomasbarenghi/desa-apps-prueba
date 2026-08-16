import { Box, Text } from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom"
import { RequireAuth } from "@repo/components"
import { AUTH_URL } from "./config"

const AdminHome = () => (
  <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
    <Text fontSize="2xl" fontWeight="bold">
      Admin
    </Text>
  </Box>
)

export default function App() {
  return (
    <Routes>
      <Route element={<RequireAuth loginPath={`${AUTH_URL}/login`} roles={["admin"]} />}>
        <Route index element={<AdminHome />} />
      </Route>
    </Routes>
  )
}
