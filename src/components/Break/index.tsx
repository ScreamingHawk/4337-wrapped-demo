import React from "react"
import geometric_long from "./geometric_long.webp"
import useStyles from "./styles"

type BreakProps = {
  type?: "thin" | "normal"
}

export const Break: React.FC<BreakProps> = ({ type = "normal" }) => {
  const classes = useStyles()

  let className = classes.container
  if (type === "thin") {
    className += ` ${classes.thin}`
  }
  return (
    <div className={className}>
      <img className={classes.inner} src={geometric_long} alt="line break" />
    </div>
  )
}
