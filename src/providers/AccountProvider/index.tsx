import { createContext, useEffect, useState } from "react"
import { JsonRpcProvider, Wallet } from "ethers"
import { Account } from "../../utils/chain/account"
import { CONFIG } from "../../config/config"

type AccountInfo = {
  address: string
  balance: bigint
}

interface CtxProps {
  signer?: Wallet
  account?: Account
  accountInfo?: AccountInfo
}

export const AccountContext = createContext<CtxProps>({})
export const AccountContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [signer, setSigner] = useState<Wallet>()
  const [account, setAccount] = useState<Account>()
  const [accountInfo, setAccountInfo] = useState<AccountInfo>()

  useEffect(() => {
    if (!signer) {
      // load metadata from local storage if it exists
      let walletPk = localStorage.getItem("wallet_pk")
      if (!walletPk) {
        // Create a random key
        const wallet = Wallet.createRandom()
        walletPk = wallet.privateKey
        localStorage.setItem("wallet_pk", walletPk)
      }
      if (!walletPk) {
        throw new Error("Could not load or create wallet")
      }
      const provider = new JsonRpcProvider(CONFIG.NETWORK_PROVIDER)
      setSigner(new Wallet(walletPk, provider))
    } else {
      setAccount(new Account(signer))
    }
  }, [signer])

  useEffect(() => {
    const provider = signer?.provider
    if (account && provider) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async () => {
        const address = await account.getAddress()
        const balance = await provider.getBalance(address)
        setAccountInfo({ address, balance })
      })()
    }
  }, [account, signer?.provider])

  return (
    <AccountContext.Provider value={{ signer, account, accountInfo }}>
      {children}
    </AccountContext.Provider>
  )
}
