import { IconButton } from "@chakra-ui/react"
import ArrowLeft from "@gravity-ui/icons/ArrowLeft"
import { useNavigate } from "react-router-dom"

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <IconButton
      variant="ghost"
      aria-label="Volver"
      borderRadius="full"
      alignSelf="flex-start"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft width={22} height={22} />
    </IconButton>
  )
}
