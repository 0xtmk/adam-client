import { useUserStore } from "@/hooks/stores/use-user-store"
import { openLinkInNewTab } from "@/utils/common"
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react"
import { Keypair } from "@solana/web3.js"
import { solanaWalletName } from "../configs/solana.config"

export const useSolanaWallet = () => {
  const solanaWallet = useWallet()
  const anchorWallet = useAnchorWallet()

  const { token, reset } = useUserStore()

  const handleConnectWallet = async () => {
    try {
      const wallet = solanaWallet.wallets?.find((wallet) => {
        return wallet?.adapter?.name === solanaWalletName
      })

      if (!wallet || wallet.readyState === "NotDetected") {
        return openLinkInNewTab(wallet?.adapter?.url)
      }

      solanaWallet.select(wallet?.adapter?.name)

      await solanaWallet.connect()
    } catch (error) {
      console.log("🚀 ~ handleConnectWal ~ error:", error)
    }
  }

  const handleDisconnectWallet = async () => {
    await solanaWallet.disconnect()
    reset()
  }

  return {
    connectWallet: handleConnectWallet,
    disconnectWallet: handleDisconnectWallet,
    isLogined: Boolean(token && solanaWallet?.connected),
    address: solanaWallet?.connected ? solanaWallet?.publicKey?.toString() : undefined,
    fakePayer: undefined as unknown as Keypair,
    provider: solanaWallet,
    ...solanaWallet,
  }
}
