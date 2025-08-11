import { appConfig } from "@/configs/app.config"
import { useSearchParams } from "react-router-dom"
import useSWR from "swr"
import { useVersionStore } from "../stores/use-version-store"

export const useSentryVersion = () => {
  const { version, setVersion } = useVersionStore()

  const [searchParams, setSearchParams] = useSearchParams()

  useSWR(
    ["sentry-version", version],
    async () => {
      if (version !== appConfig.version) {
        localStorage.clear()
        sessionStorage.clear()

        searchParams.delete("chain_id")
        setSearchParams(searchParams)

        setVersion(appConfig.version)

        window.location.reload()
      }
    },
    {
      dedupingInterval: 60 * 1000 * 1000,
    },
  )

  return null
}
