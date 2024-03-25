import { BigNumberish, Contract, Interface, Signer, getBytes } from "ethers"
import { ErrorDecoder } from "ethers-decode-error"
import { ACCOUNT_FACTORY_ADDR, ENTRY_POINT_ADDR } from "../constants"
import EntryPointAbi from "./abi/EntryPoint.json"
import AccountAbi from "./abi/SimpleAccount.json"
import AccountFactoryAbi from "./abi/SimpleAccountFactory.json"
import {
  UserOperation,
  getUserOpHash,
  packUserOperation,
} from "./useroperation"

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

    const callGasLimit = await this.provider.estimateGas({
      from: await this.entryPoint.getAddress(),
      to: await this.getAddress(),
      data: callData,
    })

    const feeData = await this.provider.getFeeData()

    const userOp: UserOperation = {
      sender: await this.getAddress(),
      nonce: BigInt(tx.nonce ?? (await this.getNonce())),
      callData,
      callGasLimit,
      verificationGasLimit: 100000n,
      preVerificationGas: 10000n, //FIXME
      maxFeePerGas: feeData.maxFeePerGas ?? 0n,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ?? 0n,
      signature: "0x",
    }

    if (!(await this.isDeployed())) {
      // Add init data
      userOp.factory = await this.factory.getAddress()
      userOp.factoryData = this.factory.interface.encodeFunctionData(
        "createAccount",
        [await this.owner.getAddress(), this.salt],
      )
      userOp.verificationGasLimit += await this.provider.estimateGas({
        to: userOp.factory,
        data: userOp.factoryData,
      })
    }

    userOp.signature = await this.signUserOperation(userOp)
    return userOp
  }

  async signUserOperation(userOp: UserOperation): Promise<string> {
    const opHash = await getUserOpHash(userOp, this.provider)
    return this.owner.signMessage(getBytes(opHash))
  }

  async simulateUserOperation(userOp: UserOperation): Promise<void> {
    const packed = packUserOperation(userOp)
    // const callData = this.entryPoint.interface.encodeFunctionData("handleOps", [
    //   [packed],
    //   await this.owner.getAddress(),
    // ])
    // console.log(callData)
    try {
      await this.entryPoint
        .getFunction("handleOps")
        .staticCall([packed], await this.owner.getAddress()) // Beneficiary can be random address for simulation
    } catch (err) {
      // Decode error and rethrow
      const errorDecoder = ErrorDecoder.create([this.entryPoint.interface])
      throw await errorDecoder.decode(err)
    }
  }
}
