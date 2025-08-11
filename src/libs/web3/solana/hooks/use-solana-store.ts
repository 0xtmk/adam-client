import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { solanaChain } from "../configs/solana.config"
import { SolanaChain } from "../solana.type"

export interface SolanaStoreProps {
  chain: SolanaChain
  setChain(chain: SolanaChain): void
}

export const useSolanaStore = create<SolanaStoreProps>()(
  devtools((set, get) => {
    return {
      chain: solanaChain,
      setChain(chain) {
        set({ chain })
      },
    }
  }),
)
