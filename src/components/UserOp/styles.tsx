import { createUseStyles } from "react-jss"

export default createUseStyles({
  container: {},
  element: {},
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
