import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./components/ColorModeProvider";
import App from "./App";
import { system } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider defaultTheme="system" enableSystem>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </ColorModeProvider>
  </StrictMode>,
);
