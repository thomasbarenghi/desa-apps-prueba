import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `"Outfit", system-ui, sans-serif` },
        body: { value: `"Outfit", system-ui, sans-serif` },
      },
      colors: {
        brand: {
          500: { value: "#EA580C" },
          600: { value: "#C2410C" },
          700: { value: "#9A3412" },
        },
        accent: {
          500: { value: "#F59E0B" },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: { _light: "#FFFFFF", _dark: "#17120C" },
        },
        "bg.panel": {
          value: { _light: "#FFFFFF", _dark: "#201912" },
        },
        "bg.muted": {
          value: { _light: "#FFF1E5", _dark: "#2B2218" },
        },
        "bg.subtle": {
          value: { _light: "#FFF9F4", _dark: "#1E1810" },
        },
        fg: {
          value: { _light: "#1C1917", _dark: "#F7EFE7" },
        },
        "fg.muted": {
          value: { _light: "#6B7280", _dark: "#A8A29E" },
        },
        "fg.subtle": {
          value: { _light: "#9CA3AF", _dark: "#78716C" },
        },
        "border.subtle": {
          value: { _light: "#FBE4D2", _dark: "#3A2F24" },
        },
        "border.muted": {
          value: { _light: "#F6D6BE", _dark: "#45372A" },
        },
        "border.emphasized": {
          value: { _light: "#EBC2A2", _dark: "#5A4938" },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "bg",
      color: "fg",
    },
  },
})

export const system = createSystem(defaultConfig, config)
