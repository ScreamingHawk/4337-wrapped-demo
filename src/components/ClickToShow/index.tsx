import React, { useState } from "react"
import { useTheme } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"
import useStyles from "./styles"

export const ClickToShow: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)

  const [hidden, setHidden] = useState(true)

  if (hidden) {
    return (
      <div className={classes.hidden} onClick={() => setHidden(false)}>
        Click to unhide 👀
      </div>
    )
  }

  return <div className={classes.visible}>{children}</div>
}
