import { Image } from "@chakra-ui/react"
import { useLogoAsset } from "./hooks/useLogoAsset"
import type { LogoProps } from "./types"

export const Logo = ({ height = "40px", className }: LogoProps) => {
  const src = useLogoAsset()
  return <Image src={src} alt="UNaHur" maxHeight={height} height={height} width="auto" objectFit="contain" className={className} />
}
