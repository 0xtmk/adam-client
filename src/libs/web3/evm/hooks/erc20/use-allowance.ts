import { useCallback } from "react"
import useSWR, { SWRConfiguration } from "swr"
import { Address, BaseError, erc20Abi, formatUnits, hexToBigInt, isAddress, parseUnits } from "viem"

import { popError, popPending, popPendingConfirm, popSuccess, popWeb3Errors } from "@/utils/pop"
import { useWagmiClient } from "../core/use-wagmi-client"
import { useToken } from "./use-token"

const MaxUint256 = hexToBigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")

export const useAllowance = (
  {
    tokenAddress,
    spenderAddress,
    enabled = true,
  }: { tokenAddress?: Address; spenderAddress?: Address; enabled?: boolean } = {},
  config?: SWRConfiguration,
) => {
  const { chain, account, publicClient, walletClient } = useWagmiClient()

  const { data: token } = useToken({
    address: tokenAddress,
    chainId: chain?.id,
    enabled: Boolean(tokenAddress && spenderAddress),
  })

  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    mutate: refetchAllowance,
  } = useSWR(
    ["get-allowance", account, publicClient, token, enabled, tokenAddress, spenderAddress],
    async () => {
      if (!enabled) return

      if (!account || !publicClient || !tokenAddress || !spenderAddress) return

      if (!isAddress(tokenAddress?.toLowerCase()) || !isAddress(spenderAddress?.toLowerCase())) return

      const allowance = await publicClient.readContract({
        abi: erc20Abi,
        address: tokenAddress,
        functionName: "allowance",
        args: [account, spenderAddress],
      })

      if (!token) return

      return allowance
    },
    config,
  )
  const handleApprove = useCallback(
    async (amount?: string) => {
      try {
        if (!walletClient || !tokenAddress || !spenderAddress || !token || !publicClient) return false

        popPendingConfirm()
        const hash = await walletClient.writeContract({
          account,
          abi: erc20Abi,
          address: tokenAddress,
          functionName: "approve",
          args: [spenderAddress, amount ? parseUnits(amount, token?.decimals) : MaxUint256],
        })
        popPending({ message: `Approving spending cap for ${token?.symbol || "the token"}`, hash })

        const { status } = await publicClient.waitForTransactionReceipt({
          hash,
        })
        if (status === "success") {
          popSuccess({
            message: `Approve token successfully`,
            hash,
          })
          refetchAllowance()

          return true
        } else {
          popError({ message: "Contract execution failed", hash })

          return false
        }
      } catch (err) {
        popWeb3Errors(err as BaseError, "Approve failed")

        return false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [walletClient, tokenAddress, spenderAddress, account, token?.symbol, publicClient],
  )

  const allowanceFormatted = allowance && token ? +formatUnits(allowance || BigInt(0), token?.decimals) : 0

  return { allowance, allowanceFormatted, isAllowanceLoading, approve: handleApprove, refetchAllowance }
}
