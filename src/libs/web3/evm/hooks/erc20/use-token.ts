import useSWR from "swr"
import { Address, erc20Abi, isAddress } from "viem"
import { useConfig } from "wagmi"
import { multicall } from "wagmi/actions"
import { useShallow } from "zustand/react/shallow"
import { useWagmiClient } from "../core/use-wagmi-client"
import { useWeb3Store } from "../stores/use-web3-store"

// Muticall token infos with chain support function multicall3
export const useToken = ({
  address,
  chainId,
  enabled,
}: {
  address?: Address
  chainId?: number
  enabled?: boolean
} = {}) => {
  const wagmiConfig = useConfig()

  const { publicClient } = useWagmiClient({ chainId })

  const { chain } = useWeb3Store(useShallow((state) => ({ chain: state.chain })))

  const response = useSWR(
    ["get-token-info", publicClient, address, chainId, enabled],
    async () => {
      const _enabled = enabled ?? true

      if (!address || !isAddress(address || "") || !_enabled || !publicClient) return

      // When chain support multicall3
      if (!publicClient?.chain?.contracts?.multicall3?.address) {
        const [name, symbol, decimals] = await Promise.all([
          publicClient.readContract({
            abi: erc20Abi,
            address,
            functionName: "name",
          }),
          publicClient.readContract({
            abi: erc20Abi,
            address,
            functionName: "symbol",
          }),
          publicClient.readContract({
            abi: erc20Abi,
            address,
            functionName: "decimals",
          }),
        ])

        return {
          name,
          symbol,
          decimals,
          address,
        }
      }

      // When chain does not support multicall3
      const [name, symbol, decimals] = await multicall(wagmiConfig, {
        contracts: [
          {
            abi: erc20Abi,
            address: address,
            functionName: "name",
          },
          {
            abi: erc20Abi,
            address: address,
            functionName: "symbol",
          },
          {
            abi: erc20Abi,
            address: address,
            functionName: "decimals",
          },
        ],
        allowFailure: false,
        chainId: chainId || chain.id,
      })

      return {
        name,
        symbol,
        decimals,
        address,
      }
    },
    { dedupingInterval: Infinity },
  )

  return response
}
