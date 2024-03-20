import { createUseStyles } from "react-jss"
import { ThemeProps } from "../../components/ThemeProvider"

export default createUseStyles({
  accent: {
    fontWeight: "bold",
    color: (theme: ThemeProps) => theme.colors.highlight,
  },
})
