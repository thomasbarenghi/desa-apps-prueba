import { useColorModeValue } from "../../ColorModeProvider/hooks/useColorModeValue"
import logoLight from "../assets/logo-light.svg"
import logoDark from "../assets/logo-dark.svg"

export const useLogoAsset = () => {
  return useColorModeValue(logoLight, logoDark)
}
