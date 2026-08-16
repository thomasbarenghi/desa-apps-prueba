import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Logo } from "../Logo"

const VISIBLE_MS = 1400
const FADE_MS = 300

export const SplashScreen = () => {
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), VISIBLE_MS)
    const hideTimer = setTimeout(() => setHidden(true), VISIBLE_MS + FADE_MS)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (hidden) return null

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex="max"
      bg="bg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={fading ? 0 : 1}
      transition={`opacity ${FADE_MS}ms ease`}
      aria-hidden={fading}
    >
      <Box animationName="fade-in" animationDuration="slow">
        <Logo height="64px" />
      </Box>
    </Box>
  )
}
