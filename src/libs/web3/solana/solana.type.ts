import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

export interface SolanaChain {
  network: WalletAdapterNetwork
  rpcUrl: string
  wssUrl?: string
  blockExplorer: {
    url: string
    param?: string
  }
}