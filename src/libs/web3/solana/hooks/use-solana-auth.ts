import bs58 from "bs58"
import { jwtDecode } from "jwt-decode"
import { useCallback, useRef } from "react"
import { toast } from "react-toastify"

import { appConfig } from "@/configs/app.config"
import { useUserStore } from "@/hooks/stores/use-user-store"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { Service } from "@/services/app.service"
import { getErrorMessage } from "@/utils/common"
import { CUSTOM_EVENT_NAME, sendCustomEvent } from "@/utils/custom-events"
import { toastContent } from "@/utils/toast"

export const useSolanaAuth = () => {
  const { address, connected, disconnecting, publicKey, disconnectWallet, signMessage } = useSolanaWallet()

  const checkedFirstLoginRef = useRef<boolean>(false)

  const { userInfo, token, updateUserInfo, setToken, reset, setIsLoggedIn } = useUserStore()

  const handleLogin = useCallback(async () => {
    if (!address || disconnecting || !connected || checkedFirstLoginRef.current) return

    const isExpired = token && jwtDecode<{ exp: number }>(token).exp * 1000 <= Date.now()
    const isInvalidToken = !token || isExpired
    const isKeepedAddress = userInfo?.address && address?.toLowerCase() === userInfo?.address?.toLowerCase()

    if (isKeepedAddress && !isInvalidToken) {
      return true
    }

    try {
      const { nonce } = await Service.auth.getNonce(address)

      setToken("")

      if (!nonce) {
        toastContent(
          {
            type: "error",
            message: "Failed to get nonce",
          },
          { toastId: "get-nonce-failed" },
        )
        return false
      }

      // Loading....

      toastContent(
        {
          type: "loading",
          message: "Please confirm the sign message on your wallet!",
        },
        { toastId: "sign-message" },
      )

      checkedFirstLoginRef.current = true

      const encodedMessage = new TextEncoder().encode(`${appConfig.solanaSignMessage} ${nonce}`)

      const signedMessage = await signMessage?.(encodedMessage)

      if (!signedMessage) throw new Error("Signed message is invalid")

      const { user_info, token } = await Service.auth.login(address, bs58.encode(signedMessage!))

      updateUserInfo(user_info)
      setToken(token)

      setIsLoggedIn(true)

      sendCustomEvent(CUSTOM_EVENT_NAME.ReloadGame, true)

      // Success
      toastContent(
        {
          type: "success",
          message: "Logged in successfully",
        },
        { toastId: "login-successfully" },
      )
      return true
    } catch (err) {
      const errorMessage = getErrorMessage(err)

      toastContent({
        type: "error",
        message: errorMessage,
      })
      // Error
      // disconnectWallet Wallet
      disconnectWallet()

      return false
    } finally {
      toast.dismiss("sign-message")
      checkedFirstLoginRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userInfo?.address, address, connected, disconnecting])

  const handleRefreshUserInfo = useCallback(async () => {
    if (!token) return

    try {
      const userInfo = await Service.user.getUser()
      updateUserInfo(userInfo)
    } catch (error) {
      console.log("🚀 ~ file: use-auth.ts:78 ~ handleRefreshUserInfo ~ error:", error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleLogout = async () => {
    if (address) {
      disconnectWallet()
    }
    reset()
  }

  return {
    userInfo,
    token,

    login: handleLogin,
    logout: handleLogout,
    refreshUserInfo: handleRefreshUserInfo,
  }
}
