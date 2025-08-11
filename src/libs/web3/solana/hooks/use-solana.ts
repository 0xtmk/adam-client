import { ConnectionConfig } from "@solana/web3.js"
import { useMemo } from "react"
import { Solana } from ".."
import { useSolanaStore } from "./use-solana-store"

export const useSolana = (config?: ConnectionConfig) => {
  const { chain } = useSolanaStore()

  const solana = useMemo(
    () =>
      new Solana({
        rpcUrl: chain.rpcUrl,
        ...(config || {}),
      }),
    [chain.rpcUrl, config],
  )

  return { solana }
}
