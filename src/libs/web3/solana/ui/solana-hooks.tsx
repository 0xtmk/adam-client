import { FC, memo } from "react"
import { useSentrySolanaAuth } from "../hooks/use-sentry-solana-auth"

interface SolanaHooksProps {}

export const SolanaHooks: FC<SolanaHooksProps> = memo(() => {
  useSentrySolanaAuth()

  return null
})

SolanaHooks.displayName = "SolanaHooks"
