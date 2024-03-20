import React from "react"
import { useTheme } from "react-jss"
import { ThemeProps } from "../ThemeProvider"
import useStyles from "./styles"

export const Accent: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)
  return <span className={classes.accent}>{children}</span>
}
