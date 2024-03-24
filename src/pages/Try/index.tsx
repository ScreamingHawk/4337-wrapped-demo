import { formatEther, parseEther } from "ethers"
import React, { useContext } from "react"
import { Accent } from "../../components/Accent"
import { Break } from "../../components/Break"
import { Form, FormButton, FormLabel } from "../../components/Form"
import { H1, H2 } from "../../components/Heading"
import { UserOpDisplay } from "../../components/UserOp"
import { AccountContext } from "../../providers/AccountProvider"
import useStyles from "./styles"
import { UserOperation } from "../../utils/chain/useroperation"

export const TryPage: React.FC = () => {
  const classes = useStyles()

  const { account, accountInfo } = useContext(AccountContext)
  const [userOp, setUserOp] = React.useState<UserOperation>()

  if (!account || !accountInfo) {
    return (
      <div className={classes.container}>
        <H1>Test Transaction</H1>
        <span>Loading...</span>
      </div>
    )
  }

  const sendTx = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { recipient, amount } = e.currentTarget
    const amountVal = parseEther(amount.value)

    setUserOp(
      await account.signedUserOperationFromTx({
        to: recipient.value,
        value: amountVal,
      }),
    )
  }

  const balNum = Number.parseFloat(formatEther(accountInfo.balance))

  return (
    <div className={classes.container}>
      <H1>Test Transaction</H1>
      <p>
        Make a test <Accent>ERC-4337</Accent> transaction using the below form.
      </p>
      <Break />
      <Form onSubmit={sendTx}>
        <FormLabel>
          <span>Recipient Address</span>
          <input
            type="text"
            name="recipient"
            defaultValue={accountInfo.address}
          />
        </FormLabel>
        <FormLabel suffix="suffixETH">
          <span>Amount</span>
          <input type="number" max={balNum} name="amount" defaultValue={0.01} />
        </FormLabel>
        <FormButton type="submit">Create ERC-4337 UserOp</FormButton>
      </Form>
      {userOp && (
        <>
          <Break />
          <H2>User Operation</H2>
          <UserOpDisplay userOp={userOp} />
          <Break />
        </>
      )}
    </div>
  )
}
