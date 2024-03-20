import React from "react"
import { useTheme } from "react-jss"
import { Accent } from "../../components/Accent"
import { ThemeProps } from "../../components/ThemeProvider"
import geometric_square from "./geometric_sq.webp"
import useStyles from "./styles"

export const Home: React.FC = () => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <h1>4337 Wrapped 🎁</h1>
        <p>
          Create <Accent>ERC-4337 User Ops</Accent>, then wrap them into{" "}
          <Accent>ERC-5189 Operations</Accent> and submit to a{" "}
          <Accent>public mempool</Accent> for execution.
        </p>
      </div>
      <img
        className={classes.img}
        src={geometric_square}
        alt="Geometric shapes"
      />
    </div>
  )
}
