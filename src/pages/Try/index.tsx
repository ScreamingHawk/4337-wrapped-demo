import { formatEther, parseEther } from "ethers"
import { DecodedError } from "ethers-decode-error"
import React, { useContext, useState } from "react"
import { Accent } from "../../components/Accent"
import { Break } from "../../components/Break"
import { Button } from "../../components/Button"
import { Form, FormButton, FormLabel } from "../../components/Form"
import { H1, H2 } from "../../components/Heading"
import { UserOpDisplay } from "../../components/UserOp"
import { AccountContext } from "../../providers/AccountProvider"
import { Wrapper } from "../../utils/api/wrapper"
import { UserOperation } from "../../utils/chain/useroperation"
import useStyles from "./styles"

type SimulationResult = {
  success: boolean
  error?: string
}

type SubmitResult = {
  success: boolean
  error?: string
  erc5189OpHash?: string
}

export const TryPage: React.FC = () => {
  const classes = useStyles()

  const { account, accountInfo } = useContext(AccountContext)
  const [userOp, setUserOp] = useState<UserOperation>()
  const [simulationResult, setSimulationResult] = useState<SimulationResult>()
  const [submitResult, setSubmitResult] = useState<SubmitResult>()

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

    setSubmitResult(undefined)
    setSimulationResult(undefined)
    setUserOp(undefined)
    setUserOp(
      await account.signedUserOperationFromTx({
        to: recipient.value,
        value: amountVal,
      }),
    )
  }

  const callSimulate = async () => {
    if (!userOp) {
      return
    }

    try {
      setSubmitResult(undefined)
      setSimulationResult(undefined)
      await account.simulateUserOperation(userOp)
      setSimulationResult({
        success: true,
      })
    } catch (err) {
      const result = err as DecodedError
      const errMsg = result.args?.length > 0 ? result.args[1] : result.reason
      setSimulationResult({
        success: false,
        error: errMsg,
      })
    }
  }

  const sendUserOperation = async () => {
    if (!userOp) {
      return
    }
    const client = new Wrapper()
    try {
      setSubmitResult(undefined)
      const response = await client.submitUserOperation(userOp)
      setSubmitResult({
        success: true,
        erc5189OpHash: response.operationHash,
      })
    } catch (err) {
      setSubmitResult({
        success: false,
        error: (err as Error).message,
      })
    }
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
          <Button onClick={callSimulate}>Simulate</Button>
          {simulationResult && (
            <p>
              <Accent loud>
                {simulationResult.success
                  ? "Success"
                  : `Failed: ${simulationResult.error}`}
              </Accent>
            </p>
          )}
          {simulationResult?.success && (
            <Button onClick={sendUserOperation}>Send it!</Button>
          )}
          {submitResult && (
            <p>
              <Accent loud>
                {submitResult.success
                  ? `Success! ERC-5189 Operation Hash: ${submitResult.erc5189OpHash}`
                  : `Failed: ${submitResult.error}`}
              </Accent>
            </p>
          )}
        </>
      )}
    </div>
  )
}
