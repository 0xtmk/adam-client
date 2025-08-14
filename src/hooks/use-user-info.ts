import { Service } from "@/services/app.service"
import useSWR from "swr"
import { useUserStore } from "./stores/use-user-store"

const useUserInfo = () => {
  const { token } = useUserStore()
  const { data: userBalance } = useSWR(
    ["get-user-info", token],
    async () => {
      if (!token) return null
      const response = await Service.user.getInfo()
      return response
    },
    {
      refreshInterval: 10000,
    },
  )

  return {
    userBalance,
  }
}

export default useUserInfo
