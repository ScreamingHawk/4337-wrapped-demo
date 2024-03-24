import React from "react"
import { useTheme } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"
import useStyles from "./styles"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  extraClassName?: string
}

export const Button: React.FC<ButtonProps> = ({ extraClassName, ...props }) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)

  if (extraClassName) {
    props.className = `${classes.button} ${extraClassName}`
  } else {
    props.className = classes.button
  }

  return <button {...props}></button>
}
