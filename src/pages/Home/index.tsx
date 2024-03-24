import React from "react"
import { useTheme } from "react-jss"
import { Accent } from "../../components/Accent"
import { H1 } from "../../components/Heading"
import { Link } from "../../components/Link"
import { ThemeProps } from "../../providers/ThemeProvider"
import geometric_square from "./geometric_sq.webp"
import useStyles from "./styles"

export const HomePage: React.FC = () => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <H1>4337 Wrapped 🎁</H1>
        <p>
          Create <Accent>ERC-4337 User Ops</Accent>, then wrap them into{" "}
          <Accent>ERC-5189 Operations</Accent> and submit to a{" "}
          <Accent>public mempool</Accent> for execution.
        </p>
        <div className={classes.buttonContainer}>
          <Link useRouter href="/account" type="button">
            Your Account
          </Link>
          <Link useRouter href="/try" type="button">
            Try it out
          </Link>
        </div>
      </div>
      <img
        className={classes.img}
        src={geometric_square}
        alt="Geometric shapes"
      />
    </div>
  )
}
