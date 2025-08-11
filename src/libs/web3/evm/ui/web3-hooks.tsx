import { FC } from "react"
import { useSentryChain } from "../hooks/core/use-sentry-chain"

interface Web3HooksProps {}

export const Web3Hooks: FC<Web3HooksProps> = () => {
  // ******** Optional ********
  // useSentryAuth()

  // useSentryWeb3Config()

  useSentryChain()

  return null
}
