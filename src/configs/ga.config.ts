import { ENV, Env } from "./env.config"

export const gaConfig = <const>{
  [Env.development]: "G-TME3RY1ZYC",
  [Env.staging]: "",
  [Env.production]: "G-TME3RY1ZYC",
}

export const GA_ID = gaConfig[ENV] || "GA_MEASUREMENT_ID"
