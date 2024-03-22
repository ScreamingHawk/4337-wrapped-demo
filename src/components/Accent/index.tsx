import React from "react"
import { useTheme } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"
import useStyles from "./styles"

type AccentProps = {
  loud?: boolean
}

export const Accent: React.FC<React.PropsWithChildren<AccentProps>> = ({
  loud = false,
  children,
}) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)
  const className = loud ? classes.loud : classes.accent
  return <span className={className}>{children}</span>
}
