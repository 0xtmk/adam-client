import { ENV } from "@/configs/env.config"
import { SOLANA_CONTRACTS } from "../constants/solana-contracts"
import { useSolanaStore } from "./use-solana-store"

export function getSolContractAddresses() {
  return Object.fromEntries(
    Object.entries(SOLANA_CONTRACTS).map(([key, object]) => {
      return [key, object[ENV]]
    })
  ) as Record<keyof typeof SOLANA_CONTRACTS, string>
}

export const useSolanaContracts = () => {
  const { chain } = useSolanaStore()

  return getSolContractAddresses()
}
