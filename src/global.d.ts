import { ThemeProps } from "./providers/ThemeProvider"

declare global {
  namespace Jss {
    export type Theme = ThemeProps
  }
}

export {}
