import { createUseStyles } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"

export default createUseStyles({
  container: {
    borderCollapse: "collapse",
    border: "1px solid",
    borderColor: (theme: ThemeProps) => theme.colors.accent,
    "& tr:nth-child(odd)": {
      backgroundColor: (theme: ThemeProps) => theme.colors.lightBackground,
    },
  },
  element: {
    "& > *": {
      padding: "0.25em",
    },
  },
  label: {
    fontWeight: "bold",
    lineHeight: "1.5em",
    verticalAlign: "top",
    textAlign: "left",
    paddingRight: "1em",
    whiteSpace: "nowrap",
  },
  value: {
    fontFamily: "monospace",
    fontSize: "1.2em",
    lineHeight: "0.8em",
    wordBreak: "break-word",
    textAlign: "right",
  },
})
