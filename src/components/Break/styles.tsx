import { createUseStyles } from "react-jss"

export default createUseStyles({
  container: {
    display: "block",
    margin: "0.5em auto",
    maxWidth: "100%",
  },
  thin: {
    maxHeight: "50px",
    overflow: "hidden",
  },
  inner: {
    maxWidth: "100%",
    objectFit: "cover",
  },
})
