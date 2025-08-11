import { ENV, Env } from "@/configs/env.config"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { clusterApiUrl } from "@solana/web3.js"
import { SolanaChain } from "../solana.type"

const RPC_URLS_MAINNET = [
  "https://cold-hanni-fast-mainnet.helius-rpc.com",
  "https://greatest-old-orb.solana-mainnet.quiknode.pro/4fa5da189e41f0637dad36ebd8ea5f870cb254d5",
  clusterApiUrl(WalletAdapterNetwork.Mainnet),
]

export const solanaDevnetChain: SolanaChain = {
  network: WalletAdapterNetwork.Devnet,
  rpcUrl: "https://devnet.helius-rpc.com/?api-key=78c27d0e-8a8c-44a0-847d-a0f49609219c",
  blockExplorer: {
    url: "https://explorer.solana.com",
    param: "?cluster=devnet",
  },
}
export const solanaMainnetChain: SolanaChain = {
  network: WalletAdapterNetwork.Mainnet,
  rpcUrl: RPC_URLS_MAINNET[0],
  blockExplorer: {
    url: "https://solscan.io",
  },
}

const solanaChainConfigs = <const>{
  [Env.development]: solanaDevnetChain,
  [Env.staging]: solanaMainnetChain,
  [Env.production]: solanaMainnetChain,
}

export const solanaChain = solanaChainConfigs[ENV]

export const solanaWalletNames = ["Phantom"]
export const solanaWalletName = "Phantom"
