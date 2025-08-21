import { ENV, Env } from "./env.config"

export const API_URLS = <const>{
  [Env.development]: "https://adam-sv-production.up.railway.app",
  [Env.staging]: "",
  [Env.production]: "https://bless-api.adamgives.com",
}

export const WS_URLS = <const>{
  [Env.development]: "",
  [Env.staging]: "",
  [Env.production]: "",
}

export const API_URLS_FOR_CHAINS = {
  TESTNET: {
    url: API_URLS[Env.development],
    chains: [],
    // chains: [baseGoerli, bscTestnet], // Ex
  },
  MAINNET: {
    url: API_URLS[Env.production],
    chains: [],
    // chains: [base, bsc], // Ex
  },
}

export const API_URL = API_URLS[ENV]
export const WS_URL = WS_URLS[ENV]
