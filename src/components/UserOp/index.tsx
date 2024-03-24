import React from "react"
import useStyles from "./styles"
import { UserOperation } from "../../utils/chain/useroperation"
import { Accent } from "../Accent"

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
  const classes = useStyles()

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
  const classes = useStyles()

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
