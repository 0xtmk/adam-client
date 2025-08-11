import { FC } from "react"
import { ConnectWalletModal } from "./connect-wallet-modal"
import { RequiredChainModal } from "./required-chain-modal"

interface Web3ModalsProps {}

export const Web3Modals: FC<Web3ModalsProps> = () => {
  return (
    <div>
      <ConnectWalletModal />
      <RequiredChainModal />
    </div>
  )
}
