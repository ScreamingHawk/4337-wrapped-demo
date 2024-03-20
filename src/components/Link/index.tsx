import React from "react"
import { useTheme } from "react-jss"
import { ThemeProps } from "../../components/ThemeProvider"
import useStyles from "./styles"

type LinkProps = {
  type?: "button"
  href: string
}

export const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({
  type,
  href,
  children,
}) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)
  return (
    <a
      className={type === "button" ? classes.button : classes.link}
      href={href}
    >
      {children}
    </a>
  )
}
