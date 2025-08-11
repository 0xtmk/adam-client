import { storagePrefix } from "@/configs/storage.config"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface Web3ModalStore {
  isOpenModalConnectWallet: boolean
  isOpenModalCheckChain: boolean

  setIsOpenModalCheckChain(isOpenModalCheckChain: boolean): void
  setIsOpenModalConnectWallet(isOpenModalConnectWallet: boolean): void
}

export const useWeb3ModalStore = create<Web3ModalStore>()(
  devtools(
    (set) => {
      return {
        isOpenModalConnectWallet: false,
        isOpenModalCheckChain: false,

        setIsOpenModalCheckChain(isOpenModalCheckChain) {
          set({ isOpenModalCheckChain })
        },
        setIsOpenModalConnectWallet(isOpenModalConnectWallet) {
          set({ isOpenModalConnectWallet })
        },
      }
    },
    { name: storagePrefix, store: "web3-modal" },
  ),
)
