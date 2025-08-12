import { useUserStore } from "@/hooks/stores/use-user-store"
import { toastContent } from "@/utils/toast"
import { jwtDecode } from "jwt-decode"
import { useEffect, useRef } from "react"
import useSWR from "swr"
import { useSolanaAuth } from "./use-solana-auth"

export const useSentrySolanaAuth = () => {
  const { login } = useSolanaAuth()
  const { token, refreshUserInfo } = useUserStore()
  useSWR(
    ["sentry-solana-auth", login],
    async () => {
      login()
    },
    { dedupingInterval: 0 },
  )
  const tokenTimer = useRef<NodeJS.Timeout>()

  useSWR(["sentry-refresh", token], () => {
    if (!token) return
    refreshUserInfo()
  })

  const autoRefreshToken = () => {
    if (token) {
      clearTimeout(tokenTimer.current)
      const { exp } = jwtDecode<{ exp: number }>(token)
      const remaining = exp * 1000 - Date.now()

      if (!remaining) {
        toastContent({
          type: "info",
          message: "Login session has expired, please sign up to login again",
        })
      }

      tokenTimer.current = setTimeout(function () {
        login()
      }, remaining)
    }
  }

  useEffect(() => {
    autoRefreshToken()

    return function () {
      clearTimeout(tokenTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
}
