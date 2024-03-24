import { createUseStyles } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"

export default createUseStyles({
  hidden: {
    textAlign: "center",
    backgroundColor: (theme: ThemeProps) => theme.colors.lowlight,
    width: "100%",
    padding: "0.2em",
    margin: "0.2em",
    cursor: "pointer",
  },
  visible: {},
})
