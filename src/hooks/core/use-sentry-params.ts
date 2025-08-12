import { PARAMS_CODE } from "@/constants/app"
import { Service } from "@/services/app.service"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useUserStore } from "../stores/use-user-store"

const useSentryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const code = searchParams.get(PARAMS_CODE.code)

  const { userInfo, refreshUserInfo } = useUserStore()

  useEffect(() => {
    if (!code || userInfo?.twitter_id) return
    const execute = async () => {
      const res = await Service.common.callbackTwitter(code)
      if (!res) return
      searchParams.delete(PARAMS_CODE.code)
      setSearchParams(searchParams, { replace: true })
      refreshUserInfo()
    }

    execute()
  }, [userInfo, code])
}

export default useSentryParams
