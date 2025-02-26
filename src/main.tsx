import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EmbeddedPage from "./embeddedPage.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <EmbeddedPage />
      </ThemeProvider>
  </StrictMode>,
)
