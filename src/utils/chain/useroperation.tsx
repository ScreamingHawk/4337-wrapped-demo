// https://eips.ethereum.org/EIPS/eip-4337#useroperation

import {
  BigNumberish,
  BytesLike,
  Contract,
  Provider,
  solidityPacked,
} from "ethers"
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
  hash?: string // Hash of the user operation
}

export type PackedUserOperation = {
  sender: string
  nonce: BigNumberish
  initCode: BytesLike
  callData: BytesLike
  accountGasLimits: BytesLike // 32
  preVerificationGas: BigNumberish
  gasFees: BytesLike // 32
  paymasterAndData: BytesLike
  signature: BytesLike
}

let entrypoint: Contract

export const getUserOpHash = async (
  userOp: UserOperation,
  provider: Provider,
): Promise<string> => {
  if (!entrypoint) {
    entrypoint = new Contract(ENTRY_POINT_ADDR, EntryPointAbi, provider)
  }
  const packed = packUserOperation(userOp)
  const hash = await entrypoint.getFunction("getUserOpHash")(packed)
  userOp.hash = hash
  return hash
}

// Packing for EntryPoint interactions

const packUints = (
  high128: bigint | number,
  low128: bigint | number,
): BytesLike => {
  const hex = ((BigInt(high128) << 128n) | BigInt(low128)).toString(16)
  // Pad to 32 bytes
  return "0x" + "0".repeat(64 - hex.length) + hex
}

export function packUserOperation(userOp: UserOperation): PackedUserOperation {
  let initCode = "0x"
  if (userOp.factory) {
    initCode = solidityPacked(
      ["address, bytes"],
      [userOp.factory, userOp.factoryData],
    )
  }
  const accountGasLimits = packUints(
    userOp.verificationGasLimit,
    userOp.callGasLimit,
  )
  const gasFees = packUints(userOp.maxPriorityFeePerGas, userOp.maxFeePerGas)

  let paymasterAndData = "0x"
  if (
    userOp.paymaster &&
    userOp.paymasterVerificationGasLimit &&
    userOp.paymasterPostOpGasLimit &&
    userOp.paymasterData
  ) {
    paymasterAndData = solidityPacked(
      ["address, bytes32", "bytes"],
      [
        userOp.paymaster,
        packUints(
          userOp.paymasterVerificationGasLimit,
          userOp.paymasterPostOpGasLimit,
        ),
        userOp.paymasterData,
      ],
    )
  }

  return {
    sender: userOp.sender,
    nonce: userOp.nonce,
    initCode,
    callData: userOp.callData,
    accountGasLimits,
    preVerificationGas: userOp.preVerificationGas,
    gasFees,
    paymasterAndData,
    signature: userOp.signature,
  }
}
