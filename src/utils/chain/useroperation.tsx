// https://eips.ethereum.org/EIPS/eip-4337#useroperation

import { Provider, Contract } from "ethers"
import { ENTRY_POINT_ADDR } from "../constants"
import EntryPointAbi from "./abi/EntryPoint.json"

export type UserOperation = {
  sender: string // The account making the operation
  nonce: number // Anti-replay parameter (see “Semi-abstracted Nonce Support”)
  factory?: string // Account factory, only for new accounts
  factoryData?: string // Data for account factory (only if account factory exists)
  callData: string // The data to pass to the sender during the main execution call
  callGasLimit: number // The amount of gas to allocate for the main execution call
  verificationGasLimit: number // The amount of gas to allocate for the verification step
  preVerificationGas: number // Extra gas to pay the bundler
  maxFeePerGas: number // Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)
  maxPriorityFeePerGas: number // Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)
  paymaster?: string // Address of paymaster contract (or empty if account pays for itself)
  paymasterVerificationGasLimit?: number // The amount of gas to allocate for the paymaster validation code
  paymasterPostOpGasLimit?: number // The amount of gas to allocate for the paymaster post-operation code
  paymasterData?: string // Data for paymaster (only if paymaster exists)
  signature: string // Data passed into the account to verify authorization
}

let entrypoint: Contract

export const getUserOpHash = async (
  userOp: UserOperation,
  provider: Provider,
): Promise<string> => {
  if (!entrypoint) {
    entrypoint = new Contract(ENTRY_POINT_ADDR, EntryPointAbi, provider)
  }
  return entrypoint.getFunction("getUserOpHash")(userOp)
}
