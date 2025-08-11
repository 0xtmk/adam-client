import { getErrorMessage } from "@/utils/common"
import { useState } from "react"
import { toast } from "react-toastify"
import { Address, erc20Abi } from "viem"
import { useAccount, useConfig } from "wagmi"
import { watchAsset } from "wagmi/actions"
import { useShallow } from "zustand/react/shallow"
import { useWagmiClient } from "../core/use-wagmi-client"
import { useWeb3Store } from "../stores/use-web3-store"

export const useAddCustomToken = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { chain, isConnected } = useAccount()

  const { chain: chainStore } = useWeb3Store(useShallow((state) => ({ chain: state.chain })))

  const { publicClient } = useWagmiClient()

  const config = useConfig()

  const isWrongChain = chain?.id !== chainStore?.id

  const handleAddCustomToken = async (tokenInfo: { address: Address; symbol?: string; image?: string }) => {
    try {
      if (!publicClient) return

      if (!isConnected) {
        toast.error("Wallet not found")
        return
      }

      if (isWrongChain) {
        toast.error("You are wrong chain. Please switch chain to add token")
        return
      }

      setIsLoading(true)

      const [symbol, decimals] = await Promise.all([
        publicClient.readContract({
          abi: erc20Abi,
          address: tokenInfo.address,
          functionName: "symbol",
        }),
        publicClient.readContract({
          abi: erc20Abi,
          address: tokenInfo.address,
          functionName: "decimals",
        }),
      ])

      const tokenAdded = await watchAsset(config, {
        type: "ERC20",
        options: {
          ...tokenInfo,
          decimals,
          symbol: tokenInfo?.symbol || symbol,
        },
      })

      if (tokenAdded) {
        toast.success(`Add ${symbol} token successfully!`)

        return {
          ...tokenInfo,
          decimals,
          symbol,
        }
      } else {
        toast.error("Add token failed")
      }
    } catch (error: any) {
      if (error?.name === "ContractFunctionExecutionError" && error?.functionName === "symbol") {
        toast.error("Token is invalid for this chain. Please try again")
      } else {
        toast.error(getErrorMessage(error) || "Add token failed")
      }
    } finally {
      setIsLoading(false)
    }
  }
  return {
    hasChainNetwork: Boolean(chain),
    isLoading,
    isWrongChain,
    addCustomToken: handleAddCustomToken,
  }
}
