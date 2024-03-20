import { createUseStyles } from "react-jss"
import { ThemeProps } from "../../components/ThemeProvider"

const linkStyle = {
  fontWeight: "bold",
  color: (theme: ThemeProps) => theme.colors.accent,
}

export default createUseStyles({
  link: linkStyle,
  button: {
    ...linkStyle,
    padding: "0.2em 0.8em",
    border: "0.2em solid",
    borderColor: (theme: ThemeProps) => theme.colors.accent,
    textDecoration: "none",
  },
})