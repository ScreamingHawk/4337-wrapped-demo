import React from "react"
import useStyles from "./styles"
import { Link } from "../Link"

export const Header: React.FC = () => {
  const classes = useStyles()

  return (
    <nav className={classes.container}>
      <div className={classes.innerContainer}>
        <a href="/" className={classes.logo}>
          🎁
        </a>
        <Link href="/account" useRouter>
          Account
        </Link>
        <Link href="/try" useRouter>
          Try it out
        </Link>
      </div>
      <div className={classes.innerContainer}>
        <Link type="button" href="https://erc5189.io">
          ERC-5189 Docs
        </Link>
        <Link type="button" href="https://www.erc4337.io/docs">
          ERC-4337 Docs
        </Link>
      </div>
    </nav>
  )
}
