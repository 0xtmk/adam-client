import { jwtDecode } from "jwt-decode"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"
import useSWR from "swr"

import { useUserStore } from "@/hooks/stores/use-user-store"
import { useAccountEffect } from "wagmi"
import { useAuth } from "./use-auth"
import { useWagmiClient } from "./use-wagmi-client"

export const useSentryAuth = () => {
  const { walletClient, account } = useWagmiClient()

  const { token } = useUserStore()
  const { login, refreshUserInfo, logout } = useAuth()

  useAccountEffect({
    onConnect(data) {},
    onDisconnect() {
      logout()
    },
  })

  useSWR(
    ["sentry-auth", login],
    () => {
      login()
    },
    { dedupingInterval: 60 * 1000 * 1000 },
  )

  useSWR(["sentry-refresh-user-info", account, token], () => {
    if (!token || !account) return
    refreshUserInfo()
  })

  const tokenTimer = useRef<NodeJS.Timeout>()

  const autoRefreshToken = () => {
    if (token && walletClient && account) {
      clearTimeout(tokenTimer.current)
      const { exp } = jwtDecode<{ exp: number }>(token)
      const remaining = exp * 1000 - Date.now()

      if (!remaining) {
        toast.info("Login session has expired, please sign up to login again")
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
