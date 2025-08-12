import { FC } from "react"

import useSentryParams from "@/hooks/core/use-sentry-params"
import { useSentryTheme } from "@/hooks/core/use-sentry-theme"
import { useSentryVersion } from "@/hooks/core/use-sentry-version"

interface GlobalHooksProps {}

export const GlobalHooks: FC<GlobalHooksProps> = () => {
  // ******** Required hooks ********
  useSentryTheme()
  useSentryVersion()
  useSentryParams()
  
  return null
}
