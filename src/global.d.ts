import { ThemeProps } from "./components/ThemeProvider"

declare global {
  namespace Jss {
    export type Theme = ThemeProps
  }
}

export {}
