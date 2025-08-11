import { jwtDecode } from "jwt-decode"
import { useCallback, useRef } from "react"
import { toast } from "react-toastify"
import { isAddressEqual } from "viem"
import { useAccount, useDisconnect } from "wagmi"

import { useUserStore } from "@/hooks/stores/use-user-store"
import { Service } from "@/services/app.service"
import { getErrorMessage } from "@/utils/common"
import { web3Config } from "../../configs/web3.config"
import { useWagmiClient } from "./use-wagmi-client"

export const useAuth = () => {
  const { walletClient } = useWagmiClient()

  const { disconnect } = useDisconnect()

  const checkedFirstLoginRef = useRef<boolean>(false)

  const { userInfo, token, updateUserInfo, setToken, reset } = useUserStore()

  const { isConnected } = useAccount()

  const handleLogin = useCallback(async () => {
    if (!walletClient || !isConnected || checkedFirstLoginRef.current) return

    const isExpired = token && jwtDecode<{ exp: number }>(token).exp * 1000 <= Date.now()
    const isInvalidToken = !token || isExpired
    const isKeepedAddress = userInfo?.address && isAddressEqual(walletClient.account?.address, userInfo?.address)

    if (isKeepedAddress && !isInvalidToken) {
      return true
    }

    try {
      const { nonce } = await Service.auth.getNonce(walletClient.account?.address)

      if (!nonce) {
        toast.error("Failed to get nonce", { toastId: "get-nonce-failed" })
        return false
      }

      // Loading....
      toast.loading("Please confirm the sign message on your wallet to log in", { toastId: "sign-message" })

      checkedFirstLoginRef.current = true

      const sign = await walletClient.signMessage({
        account: walletClient.account?.address!,
        message: `${web3Config.signMessage} ${nonce}`,
      })
      const { user_info, token } = await Service.auth.login(walletClient.account?.address, sign)
      // Success
      toast.success("Login successfully", { toastId: "login-successfully" })

      updateUserInfo(user_info)
      setToken(token)

      return true
    } catch (err) {
      const errorMessage = getErrorMessage(err)

      toast.error(errorMessage)
      // Error
      // Disconnect Wallet
      disconnect()

      return false
    } finally {
      toast.dismiss("sign-message")
      checkedFirstLoginRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userInfo?.address, walletClient?.account?.address, isConnected])

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
    if (walletClient) {
      disconnect()
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
