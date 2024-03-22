import { formatEther } from "ethers"
import React, { useContext } from "react"
import { Accent } from "../../components/Accent"
import { Break } from "../../components/Break"
import { ClickToShow } from "../../components/ClickToShow"
import { H1, H2 } from "../../components/Heading"
import { AccountContext } from "../../providers/AccountProvider"
import useStyles from "./styles"
import { Link } from "../../components/Link"
import { CONFIG } from "../../config/config"

export const Account: React.FC = () => {
  const classes = useStyles()

  const { accountInfo, signer } = useContext(AccountContext)

  return (
    <div className={classes.container}>
      {accountInfo && (
        <>
          <H1>Account</H1>
          <p>
            Your <Accent>Abstract Account</Accent> is where you can manage your
            assets.
            <br />
            Your address is <Accent loud>{accountInfo.address}</Accent>.
          </p>
          <Break />
          <H2>Assets</H2>
          <p>
            Your account has{" "}
            <Accent loud>{formatEther(accountInfo.balance)} ETH</Accent>.
            <br />
            You can claim more ETH from{" "}
            <Link href={CONFIG.FAUCET_URL}>a faucet</Link> if you need it.
          </p>
          <Break />
        </>
      )}
      {signer && (
        <>
          <H2>Signer Key</H2>
          <p>
            Your signer key is a private key that acts as the owner of your
            account. It is used to sign transactions and messages on your
            behalf. Your signer
            <Accent>does not need to hold assets</Accent> in order to use
            ERC-4337 or ERC-5189.
            <br />
            <strong>Do not share your signer key with anyone!</strong>
          </p>
          <ClickToShow>{signer?.privateKey}</ClickToShow>
          <Break />
        </>
      )}
    </div>
  )
}
