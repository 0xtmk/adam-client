import { Env } from "@/configs/env.config"

export const SOLANA_CONTRACTS = {
  TOKEN_NATIVE: {
    [Env.development]: "So11111111111111111111111111111111111111112",
    [Env.staging]: "So11111111111111111111111111111111111111112",
    [Env.production]: "So11111111111111111111111111111111111111112",
  },

  USDC: {
    [Env.development]: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
    [Env.staging]: "",
    [Env.production]: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  },

  WALLET_SIGNATURE: {
    [Env.development]: "Ea49624c767C3c52d79f4D99db0f06E4B5855E28",
    [Env.staging]: "",
    [Env.production]: "c522141625A0C43461c4BfB449bceb8008d4a2c4",
  },
}
