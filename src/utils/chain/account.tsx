import { BigNumberish, Contract, Interface, Signer } from "ethers"
import { ACCOUNT_FACTORY_ADDR, ENTRY_POINT_ADDR } from "../constants"
import EntryPointAbi from "./abi/EntryPoint.json"
import AccountFactoryAbi from "./abi/SimpleAccountFactory.json"
import AccountAbi from "./abi/SimpleAccount.json"
import { UserOperation, getUserOpHash } from "./useroperation"

type TxRequest = {
  to: string
  nonce?: number
  data?: string
  value?: BigNumberish
}

export class Account {
  private readonly interface: Interface = new Interface(AccountAbi)
  private readonly factory: Contract
  private readonly entryPoint: Contract

  constructor(
    private owner: Signer,
    private salt = 0,
  ) {
    this.factory = new Contract(
      ACCOUNT_FACTORY_ADDR,
      AccountFactoryAbi,
      this.provider,
    )
    this.entryPoint = new Contract(
      ENTRY_POINT_ADDR,
      EntryPointAbi,
      this.provider,
    )
  }

  get provider() {
    const provider = this.owner.provider
    if (!provider) {
      throw new Error("No provider available")
    }
    return provider
  }

  async getAddress(): Promise<string> {
    return this.factory.getFunction("getAddress")(
      await this.owner.getAddress(),
      this.salt,
    )
  }

  async getNonce(key = 0): Promise<number> {
    // This returns the EntryPoint nonce
    return this.entryPoint.getFunction("getNonce")(await this.getAddress(), key)
  }

  async isDeployed(): Promise<boolean> {
    return this.provider
      .getCode(await this.getAddress())
      .then(code => code !== "0x")
  }

  async signedUserOperationFromTx(tx: TxRequest): Promise<UserOperation> {
    const callData = this.interface.encodeFunctionData("execute", [
      tx.to,
      tx.value ?? 0,
      tx.data ?? "0x",
    ])

    const userOp: UserOperation = {
      sender: await this.getAddress(),
      nonce: tx.nonce ?? (await this.getNonce()),
      callData,
      callGasLimit: 0,
      verificationGasLimit: 0,
      preVerificationGas: 0,
      maxFeePerGas: 0,
      maxPriorityFeePerGas: 0,
      signature: "0x",
    }

    if (!this.isDeployed()) {
      // Add init data
      userOp.factory = await this.factory.getAddress()
      userOp.factoryData = this.factory.interface.encodeFunctionData("deploy", [
        await this.owner.getAddress(),
        this.salt,
      ])
    }

    userOp.signature = await this.signUserOperation(userOp)
    return userOp
  }

  async signUserOperation(userOp: UserOperation): Promise<string> {
    return this.owner.signMessage(await getUserOpHash(userOp, this.provider))
  }
}
