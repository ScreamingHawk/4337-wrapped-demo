import { createUseStyles } from "react-jss"

export default createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0.5em",
    marginBottom: "1em",
    minWidth: "500px",
  },
  button: {},
  element: {
    display: "flex",
    flexDirection: "row",
    gap: "1em",
    width: "100%",
    // Last child
    "& > :last-child": {
      flexGrow: 1,
    },
  },
  // Form suffixes using ::after
  suffixETH: {
    "&::after": {
      content: "'ETH'",
      marginLeft: "-0.5em",
    },
  },
})
