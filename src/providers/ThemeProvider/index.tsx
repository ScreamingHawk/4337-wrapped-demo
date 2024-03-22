import React from "react"
import { ThemeProvider as JSSThemeProvider } from "react-jss"

const theme = {
  colors: {
    primary: "#FCD086",
    secondary: "#000000",
    accent: "#DA2B44",
    highlight: "#FDC66A",
    lowlight: "#FDD988",
    background: "#FFFFFF",
  },
}

export type ThemeProps = typeof theme

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => <JSSThemeProvider theme={theme}>{children}</JSSThemeProvider>
