import React from "react"
import geometric_long from "./geometric_long.webp"
import useStyles from "./styles"

export const Break: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <img className={classes.inner} src={geometric_long} alt="line break" />
    </div>
  )
}
