import React from "react"
import { useTheme } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"
import { UserOperation } from "../../utils/chain/useroperation"
import { Accent } from "../Accent"
import useStyles from "./styles"

type UserOpDisplayProps = {
  userOp: UserOperation
}

const camelToTitleCase = (str: string) => {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())
}

const DisplayElement: React.FC<{
  label: string
  value: string | number | bigint
}> = ({ label, value }) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)

  return (
    <tr className={classes.element}>
      <td className={classes.label}>{camelToTitleCase(label)}</td>
      <td className={classes.value}>
        <Accent>{value.toString()}</Accent>
      </td>
    </tr>
  )
}

export const UserOpDisplay: React.FC<UserOpDisplayProps> = ({ userOp }) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)

  // eslint-disable-next-line no-console
  console.log(userOp)

  return (
    <table className={classes.container}>
      <tbody>
        {Object.entries(userOp).map(([key, value]) => (
          <DisplayElement key={key} label={key} value={value} />
        ))}
      </tbody>
    </table>
  )
}
