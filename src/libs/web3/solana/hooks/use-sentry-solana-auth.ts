import useSWR from "swr"
import { useSolanaAuth } from "./use-solana-auth"

export const useSentrySolanaAuth = () => {
  const { login, logout } = useSolanaAuth()

  useSWR(
    ["sentry-solana-auth", login],
    async () => {
      login()
    },
    { dedupingInterval: 0 },
  )
}
