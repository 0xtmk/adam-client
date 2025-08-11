import { CONTRACTS } from "@/libs/web3/evm/configs/contracts.config"
import { Address } from "viem"
import { useAccount } from "wagmi"
import { useWeb3Store } from "../stores/use-web3-store"

export const getContractAddresses = (chainId: number) => {
  return Object.fromEntries(
    Object.entries(CONTRACTS).map(([key, object]) => [key, object[chainId as keyof typeof object]]),
  ) as Record<keyof typeof CONTRACTS, Address>
}

export const useContractAddresses = () => {
  const { chain } = useAccount()

  const { chain: chainStore } = useWeb3Store()
  const currentChain = chain || chainStore

  return getContractAddresses(currentChain?.id)
}
