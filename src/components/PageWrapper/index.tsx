import React from "react"
import useStyles from "./styles"
import { Header } from "../Header"

export const PageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.container}>{children}</div>
    </div>
  )
}
