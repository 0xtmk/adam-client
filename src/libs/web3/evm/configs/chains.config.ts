import { ENV, Env } from "@/configs/env.config"
import { Chain } from "viem"
import { arbitrum, base, bsc, bscTestnet, mainnet, sepolia } from "wagmi/chains"

const chainConfigs = <const>{
  [Env.development]: sepolia,
  [Env.staging]: base,
  [Env.production]: base,
}

const supportedChainsConfig = {
  [Env.development]: [mainnet, bsc, bscTestnet, arbitrum, sepolia],
  [Env.staging]: [mainnet, bsc, bscTestnet],
  [Env.production]: [bsc],
}

export const supportedChains: Chain[] = supportedChainsConfig[ENV]

export const defaultChain = chainConfigs[ENV]
