import { ZeroAddress } from "ethers"
import { CONFIG } from "../../config/config"
import {
  UserOperation as UserOperationProto,
  Wrapper as WrapperClient,
} from "../../lib/erc4337-to-erc5189-wrapper/proto/clients/proto.gen"
import { UserOperation } from "../chain/useroperation"

export class Wrapper extends WrapperClient {
  constructor() {
    super(CONFIG.WRAPPER_URL, fetch)
  }

  async submitUserOperation(op: UserOperation) {
    const userOpProto: UserOperationProto = {
      sender: op.sender,
      nonce: op.nonce.toString(),
      factory: op.factory ?? ZeroAddress,
      factoryData: op.factoryData ?? "0x",
      callData: op.callData,
      callGasLimit: op.callGasLimit.toString(),
      verificationGasLimit: op.verificationGasLimit.toString(),
      preVerificationGas: op.preVerificationGas.toString(),
      maxFeePerGas: op.maxFeePerGas.toString(),
      maxPriorityFeePerGas: op.maxPriorityFeePerGas.toString(),
      paymaster: op.paymaster ?? ZeroAddress,
      paymasterVerificationGasLimit:
        op.paymasterVerificationGasLimit?.toString() ?? "0",
      paymasterPostOpGasLimit: op.paymasterPostOpGasLimit?.toString() ?? "0",
      paymasterData: op.paymasterData ?? "0x",
      signature: op.signature,
    }
    return this.sendUserOperation({
      userOperation: userOpProto,
    })
  }
}
