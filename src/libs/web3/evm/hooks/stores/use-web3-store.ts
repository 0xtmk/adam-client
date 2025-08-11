import { storageKeys } from "@/configs/storage.config"
import { defaultChain, supportedChains } from "@/libs/web3/evm/configs/chains.config"
import { ContractAddressConfig, TokenAddressConfig, TokenInfo } from "@/types/web3.type"
import { Chain } from "viem"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Web3StoreProps {
  chain: Chain
  defaultChain: Chain
  supportedChains: Chain[]
  tokens: TokenInfo[]
  token: TokenAddressConfig
  contract: ContractAddressConfig
  enabled: boolean
  isSwitchingChain: boolean
  isWrongChain: boolean

  setDefaultChain(defaultChain: Chain): void
  setIsSwitchingChain(isSwitchingChain: boolean): void
  setEnabled(enabled: boolean): void
  setToken(token: TokenAddressConfig): void
  setTokens(tokens: TokenInfo[]): void
  setContract(contract: ContractAddressConfig): void
  setChain(chain: Chain): void
  setSupportedChains(supportedChains: Chain[]): void
  setIsWrongChain(isWrongChain: boolean): void
}

export const useWeb3Store = create<Web3StoreProps>()(
  persist(
    (set, get) => {
      return {
        tokens: [],
        supportedChains,
        defaultChain,
        chain: defaultChain,
        contract: {} as ContractAddressConfig,
        enabled: false,
        token: {} as TokenAddressConfig,
        isSwitchingChain: false,
        isWrongChain: false,

        setDefaultChain(defaultChain) {
          set({ defaultChain })
        },

        setIsSwitchingChain(isSwitchingChain) {
          set({ isSwitchingChain })
        },
        setEnabled(enabled) {
          set({ enabled })
        },
        setToken(token) {
          set({ token })
        },
        setTokens(tokens) {
          set({ tokens })
        },
        setChain(chain) {
          set({ chain })
        },
        setContract(contract) {
          set({ contract })
        },
        setSupportedChains(supportedChains) {
          set({ supportedChains })
        },
        setIsWrongChain(isWrongChain) {
          set({ isWrongChain })
        },
      }
    },
    {
      name: storageKeys.web3,
      partialize(state) {
        return {
          chain: state.chain,
          // token: state.token,
          // tokens: state.tokens,
          // contract: state.contract,
          // supportedChains: state.supportedChains,
        }
      },
    },
  ),
)
